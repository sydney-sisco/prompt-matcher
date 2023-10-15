#!/bin/bash

echo "Starting deployment..."

read -p "You're about to deploy your application. Don't forget to build the frontend! Continue? (Y/n) " user_confirmation

if [[ ! $user_confirmation =~ ^[Yy]$ ]] && [[ ! -z "$user_confirmation" ]]; then
    echo "Deployment cancelled by the user."
    exit 1
fi

gcloud run deploy webapp-template --source=.
