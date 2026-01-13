#!/bin/bash

# Configuration
PROJECT_ID=$(gcloud config get-value project)
REGION="us-central1"
WORKFLOW_NAME="daily-linkedin-post"
SERVICE_ACCOUNT="linkedin-publisher-sa"

echo "--- Deploying to Google Cloud Project: $PROJECT_ID ---"

# 1. Enable APIs
echo "Enabling Services..."
gcloud services enable workflows.googleapis.com workflowexecutions.googleapis.com cloudscheduler.googleapis.com

# 2. Create Service Account (if not exists)
if ! gcloud iam service-accounts describe $SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com > /dev/null 2>&1; then
    echo "Creating Service Account..."
    gcloud iam service-accounts create $SERVICE_ACCOUNT
fi

# 3. Deploy Workflow
# We need to replace YOUR_CRON_SECRET in the yaml. 
# For safety, we'll ask the user or look for .env (simulated here)

echo "Deploying Workflow..."
gcloud workflows deploy $WORKFLOW_NAME \
    --source=gcp/workflow.yaml \
    --service-account=$SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com \
    --location=$REGION

echo "--- Deployment Complete ---"
echo "To trigger a test run:"
echo "gcloud workflows run $WORKFLOW_NAME --location=$REGION --data='{\"topic\":\"The Future of Cordyceps\"}'"

echo ""
echo "To schedule this to run specific time (e.g. 8am):"
echo "gcloud scheduler jobs create http linkedin-daily-job \\"
echo "  --schedule='0 8 * * *' \\"
echo "  --location=$REGION \\"
echo "  --uri='https://workflowexecutions.googleapis.com/v1/projects/$PROJECT_ID/locations/$REGION/workflows/$WORKFLOW_NAME/executions' \\"
echo "  --oauth-service-account-email=$SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com"
