pipeline {
  agent any
  stages {
    stage('Build client') {
      steps {
        sh 'cd RaisingTheBAR/RaisingTheBAR.React/client/ && npm install && npm build'
      }
    }
  }
}