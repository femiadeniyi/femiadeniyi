FROM golang:alpine
WORKDIR /webo

COPY server .
RUN go build -o ./app

EXPOSE 80
CMD ["sh","-c","cd /webo && ./app"]
