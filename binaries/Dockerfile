FROM rust as BUILDER
WORKDIR /webo

COPY . .
RUN cargo build --release

FROM alpine
WORKDIR /webo
COPY --from=BUILDER /webo/target/release/femiadeniyi .
CMD /webo/femiadeniyi
