pipeline {
  agent any
  stages {
    stage('Build client') {
      steps {
        sh '''#!/bin/bash -xe
cd RaisingTheBAR/RaisingTheBAR.React/client/ && npm install && npm run build'''
      }
    }
    stage('Publish client') {
      steps {
        sh '''#!/bin/bash -xe
cd RaisingTheBAR/RaisingTheBAR.React/client/ && sudo \\cp -r build/ ../../../../../temp/'''
        sh '''#!/bin/bash -xe
../../scripts/publish.sh'''
      }
    }
  }
}