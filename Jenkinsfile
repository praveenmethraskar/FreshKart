pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Build and start the Docker Compose services
                    sh 'docker-compose up -d --build'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests if you have any
                    sh 'docker-compose exec app npm test'
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
