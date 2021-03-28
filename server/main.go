package main

import (
	"log"
	"net/http"
)

func main() {

	http.Handle("/", http.FileServer(http.Dir("./src")))

	log.Printf("Serving %s on HTTP port: %s\n", "./src", "80")
	log.Fatal(http.ListenAndServe(":80", nil))
}
