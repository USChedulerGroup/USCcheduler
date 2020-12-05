# mvn clean package -f ../FinalProj201/pom.xml
# mvn clean package -f ../FE/pom.xml
# cp ../FE/target/*.war ./
# cp ../FinalProj201/target/*.war ./

docker stop web;
docker image rm scheduler;
docker build -t scheduler . &&
docker run --rm -d -p 8080:8080 --network app --name web scheduler;