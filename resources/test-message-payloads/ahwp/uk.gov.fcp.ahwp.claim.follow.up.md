Update `commsAddresses` to your own email address.

```
{
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "source": "ffc-ahwr-claim",
    "specversion": "1.0",
    "type": "uk.gov.fcp.sfd.notification.request",
    "datacontenttype": "application/json",
    "time": "2023-10-17T14:48:00Z",
    "data": {
        "crn": "1050000000",
        "sbi": "105000000",
        "sourceSystem": "AHWP",
        "notifyTemplateId": "bf194e44-0dab-4c0e-ba9d-55bce357d3fc",
        "commsType": "email",
        "commsAddresses": [
            "jane.doe@defra.gov.uk",
            "john.doe@defra.gov.uk"
        ],
        "personalisation": {
            "reference": "test-reference",
            "applicationReference": "test-application-reference",
            "amount": "100"
        },
        "reference": "ffc-ahwr-example-reference",
        "oneClickUnsubscribeUrl": "https://unsubscribe.example.com",
        "emailReplyToId": "8e222534-7f05-4972-86e3-17c5d9f894e2"
    }
}
```