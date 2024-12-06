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
      "notifyTemplateId": "d8017132-1909-4bee-b604-b07e8081dc82",
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
      "emailReplyToId": "8e222534-7f05-4972-86e3-17c5d9f894e2"
  }
}
```