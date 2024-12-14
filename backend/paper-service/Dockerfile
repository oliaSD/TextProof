FROM maven:3.9.8-eclipse-temurin-21 as maven-builder

COPY src /app/src

COPY pom.xml /app

WORKDIR /app
RUN mvn clean install -U -DskipTests

FROM openjdk:21
COPY --from=maven-builder /app/target/paper-service-1.0.0-SNAPSHOT.jar /app/app.jar

WORKDIR /app

EXPOSE 8081

CMD ["java", "-jar", "app.jar"]
