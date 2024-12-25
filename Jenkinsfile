pipeline {
    agent any

    stages {
                stage('clone') {
            steps {
                 git branch: 'main', url: 'https://github.com/praveenmethraskar/FreshKart.git'
            }
        }
        stage('Build') {
            steps {
                script {
                    // Ensure Docker Compose is used with the correct user permissions
                    sh 'docker-compose up -d --build'
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
