use curl::easy::Easy;
use serde::Deserialize;
use std::fs::File;
use std::io;
use std::io::{BufRead, Error, Write};
use clap::{App, Arg};

#[derive(Deserialize,Debug, PartialEq, Eq)]
pub struct Version {
    pub name: String,
}

#[derive(Deserialize,Debug, PartialEq, Eq)]
pub struct Response {
    pub results: Vec<Version>,
}

// todo - make this into 1 app that
// gets latest docker version
// builds images and pushes to docker
// runs terraform

fn main() {
    let mut docker_repo = "";

    let matches = App::new("CI")
        .version("1.0")
        .author("Kevin K. <kbknapp@gmail.com>")
        .about("Does awesome things")
        .arg(Arg::new("docker repo")
            .index(1)
            .required(true)
            .takes_value(false));

    let final_matches = matches.get_matches();

    if let Some(ref matches) = final_matches.value_of("docker repo") {
        docker_repo = matches;
        println!("{}",matches);
    }


    let mut dst = Vec::new();
    let mut easy = Easy::new();
    easy.url(format!("https://registry.hub.docker.com/v2/repositories/{}/tags",docker_repo).as_str()).expect("error sending request");

    {
        let mut transfer = easy.transfer();
        transfer.write_function(|data| {
            dst.extend_from_slice(data);
            Ok(data.len())
        }).unwrap();
        transfer.perform().expect("error");

    }

    let response: Response = serde_json::from_slice(dst.as_slice()).expect("not a valid docker repository");


    let next_version = response.results.
        iter()
        .filter(|x| match x.name.parse::<u16>() {
            Ok(_) => true,
            Err(_) => false
        })
        .map(|x|x.name.parse::<u16>().unwrap())
        .max();

    let version = match next_version {
        None => 1,
        Some(_version) => _version+1
    };

    let file = File::open("C:\\Software\\femiadeniyi\\main.tf").expect("file not found");
    let lines = io::BufReader::new(file).lines();

    let new_terraform_file = lines.into_iter().fold(String::new(),|acc,x|match x {
        Ok(x) => {
            return if x.contains("#IMAGE"){
                let image = format!("{}:{}",docker_repo,version-1);
                let new_image = format!("{}:{}",docker_repo,version);
                format!("{}\n{}",acc,x.replace(&image,&new_image))
            } else {
                format!("{}\n{}",acc,x)
            }
        },
        Err(_) => acc
    });

    let mut file = File::create("main.tf").expect("error creating file");
    file.write_all(new_terraform_file.as_bytes()).expect("error writing file");

    println!("wrote {}",new_terraform_file);

    let mut file = File::create(".version").expect("error creating file");
    file.write_all(version.to_string().as_bytes()).expect("error writing file");


}
