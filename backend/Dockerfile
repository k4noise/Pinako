#
# BUILD
#
FROM maven:3.9.1-sapmachine-17 as build

COPY pom.xml /home/app/

WORKDIR /home/app/

RUN mvn -B dependency:resolve-plugins dependency:resolve

COPY . .
RUN mvn package -DskipTests

#
# RUN
#
FROM openjdk:17-jdk-alpine

COPY --from=build home/app/target/digitalportfolio-0.0.1.jar application.jar

ENTRYPOINT ["java", "-jar", "application.jar"]