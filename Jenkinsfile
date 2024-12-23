pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Ensure Docker Compose is used with the correct user permissions
                    sh 'newgrp docker && docker-compose up -d --build'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests if you have any
                    sh 'newgrp docker && docker-compose exec app npm test'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // The services are already running after 'docker-compose up -d'
                    echo 'Deployment done!'
                }
            }
        }
    }
}
