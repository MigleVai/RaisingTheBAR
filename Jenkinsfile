pipeline {
  agent any
  stages {
    stage('Build client') {
      steps {
        echo 'Begin'
        sh "cd RaisingTheBAR/RaisingTheBAR.React/client/ && npm install && npm run build"
      }
    }
    stage('Publish') {
      steps {
        sh "cd RaisingTheBAR/RaisingTheBAR.React/client/ && \\cp -r build/ ../../../../../temp/"
        sh "../../scripts/publish.sh"
      }
    }
  }
}
