var context = {
    "package": {
        "items": [],
        "courier": "Retirada Click e Collect - InPost",
        "invoiceNumber": "inpost-001",
        "invoiceValue": 10000,
        "invoiceUrl": null,
        "issuanceDate": "2016-10-31T02:00:00Z",
        "trackingNumber": "019619490185221",
        "invoiceKey": null,
        "trackingUrl": null,
        "embeddedInvoice": null,
        "type": "Output",
        "courierStatus": {
            "status": "unknown",
            "finished": false,
            "data": []
        }
    },
    "subjectItemAttachment": {
        "item": "Produto Variação Cor...",
        "totalItems": 1
    },
    "items": [],
    "sellers": [
        {
            "subSellerId": "1",
            "fulfillmentEndpoint": "http://fulfillment.vtexcommerce.com.br/api/fulfillment?sc=1&an=corebiz",
            "id": "1",
            "name": "corebiz",
            "logo": ""
        }
    ],
    "paymentData": {
        "giftCards": [],
        "transactions": [
            {
                "isActive": true,
                "transactionId": "C2CC1C9FA84544D685845A3C39E86060",
                "merchantName": "COREBIZ",
                "payments": [
                    {
                        "id": "BF9F3945927146E2BDAA9C89BD4814A9",
                        "paymentSystem": "201",
                        "paymentSystemName": "Nome da Promissória",
                        "value": 10000,
                        "installments": 1,
                        "connectorResponses": {},
                        "referenceValue": 10000,
                        "cardHolder": null,
                        "cardNumber": null,
                        "firstDigits": null,
                        "lastDigits": null,
                        "cvv2": null,
                        "expireMonth": null,
                        "expireYear": null,
                        "url": null,
                        "koinUrl": null,
                        "tid": null,
                        "redemptionCode": null,
                        "giftCardId": null,
                        "giftCardProvider": null,
                        "giftCardAsDiscount": null,
                        "group": "promissory",
                        "dueDate": null,
                        "accountId": null,
                        "parentAccountId": null
                    }
                ]
            }
        ]
    },
    "giftRegistryData": null,
    "receiptData": null,
    "marketPlaceOrderId": "",
    "sellerOrderId": "00-668792710103-01",
    "orderFormId": "dc1cb7427d70415ebe4ae64d2a023b79",
    "sequence": "500007",
    "affiliateId": "",
    "status": "",
    "callCenterOperator": "",
    "userProfileId": "8bdcb4eb-f459-4230-9a11-5441824c7b01",
    "hostName": "corebiz",
    "creationVersion": null,
    "creationEnvironment": null,
    "lastChangeVersion": null,
    "workflowInstanceId": null,
    "orderId": "668792710103-01",
    "orderGroup": "668792710103",
    "state": "invoiced",
    "isCheckedIn": false,
    "storeId": null,
    "value": 10000,
    "totals": [
        {
            "id": "Items",
            "name": "Total dos Itens",
            "value": 10000
        },
        {
            "id": "Discounts",
            "name": "Total dos Descontos",
            "value": 0
        },
        {
            "id": "Shipping",
            "name": "Total do Frete",
            "value": 0
        },
        {
            "id": "Tax",
            "name": "Total da Taxa",
            "value": 0
        }
    ],
    "clientProfileData": {
        "attachmentId": "clientProfileData",
        "email": "cpires@inpost24.com-4b.ct.vtex.com.br",
        "firstName": "Cristhian",
        "lastName": "Valgas",
        "document": "04598884630",
        "documentType": "cpf",
        "phone": "+5521996819221",
        "corporateName": null,
        "tradeName": null,
        "corporateDocument": null,
        "stateInscription": null,
        "corporatePhone": null,
        "isCorporate": false
    },
    "ratesAndBenefitsData": {
        "attachmentId": "ratesAndBenefitsData",
        "rateAndBenefitsIdentifiers": [],
        "teaser": []
    },
    "shippingData": {
        "attachmentId": "shippingData",
        "address": {
            "addressType": "residential",
            "receiverName": "RetiradaNaLoja",
            "addressId": "0ab987e8d1684c20a7abf3fb95e6bdb7",
            "postalCode": "22631-002",
            "city": "Rio de Janeiro",
            "state": "RJ",
            "country": "BRA",
            "street": "Avenida das Américas",
            "number": "3201",
            "neighborhood": "Barra da Tijuca",
            "complement": "22631-002",
            "reference": null,
            "geoCoordinates": []
        },
        "logisticsInfo": [
            {
                "itemIndex": 0,
                "selectedSla": "Retirada na loja",
                "slas": [
                    {
                        "id": "Retirada na loja",
                        "name": "Retirada na loja",
                        "deliveryIds": [
                            {
                                "courierId": "16fca1f",
                                "warehouseId": "1_1",
                                "dockId": "1",
                                "courierName": "Retirada na loja",
                                "quantity": 1
                            }
                        ],
                        "shippingEstimate": "0bd",
                        "shippingEstimateDate": "2016-10-13T16:10:39.9417089Z",
                        "lockTTL": "12d",
                        "availableDeliveryWindows": [],
                        "deliveryWindow": null,
                        "price": 0,
                        "listPrice": 0,
                        "tax": 0,
                        "pickupStoreInfo": {
                            "isPickupStore": false,
                            "friendlyName": null,
                            "address": null,
                            "additionalInfo": null,
                            "dockId": null
                        }
                    },
                    {
                        "id": "Normal",
                        "name": "Normal",
                        "deliveryIds": [
                            {
                                "courierId": "1",
                                "warehouseId": "1_1",
                                "dockId": "1",
                                "courierName": "Transportadora",
                                "quantity": 1
                            }
                        ],
                        "shippingEstimate": "3bd",
                        "shippingEstimateDate": null,
                        "lockTTL": "12d",
                        "availableDeliveryWindows": [],
                        "deliveryWindow": null,
                        "price": 500,
                        "listPrice": 500,
                        "tax": 0,
                        "pickupStoreInfo": {
                            "isPickupStore": false,
                            "friendlyName": null,
                            "address": null,
                            "additionalInfo": null,
                            "dockId": null
                        }
                    }
                ],
                "shipsTo": [
                    "BRA"
                ],
                "itemId": "3"
            }
        ],
        "availableAddresses": [
            {
                "addressType": "residential",
                "receiverName": "RetiradaNaLoja",
                "addressId": "0ab987e8d1684c20a7abf3fb95e6bdb7",
                "postalCode": "22631-002",
                "city": "Rio de Janeiro",
                "state": "RJ",
                "country": "BRA",
                "street": "Avenida das Américas",
                "number": "3201",
                "neighborhood": "Barra da Tijuca",
                "complement": "22631-002",
                "reference": null,
                "geoCoordinates": []
            }
        ]
    },
    "clientPreferencesData": {
        "attachmentId": "clientPreferencesData",
        "locale": "pt-BR",
        "optinNewsLetter": true
    },
    "marketingData": null,
    "storePreferencesData": {
        "countryCode": "BRA",
        "checkToSavePersonDataByDefault": false,
        "templateOptions": {
            "toggleCorporate": false
        },
        "timeZone": "E. South America Standard Time",
        "currencyCode": "BRL",
        "currencyLocale": 1046,
        "currencySymbol": "R$",
        "currencyFormatInfo": {
            "currencyDecimalDigits": 2,
            "currencyDecimalSeparator": ",",
            "currencyGroupSeparator": ".",
            "currencyGroupSize": 3,
            "startsWithCurrencySymbol": true
        }
    },
    "openTextField": {
        "attachmentId": "openTextField",
        "value": "{ machineCode: \"BRRIO001\", address:\"Av. Das Américas - 3201 - 22631002 - Rio de Janeiro - RJ, Ao lado da porta lateral da loja AM/PM\"}"
    },
    "changeData": null,
    "salesChannel": "1",
    "followUpEmail": "bcb4929411ce4fe48de936cf7e2d4704@ct.vtex.com.br",
    "creationDate": "2016-10-13T14:44:59.1396357Z",
    "lastChange": "2016-10-13T19:28:01.7813851Z",
    "timeZoneCreationDate": "2016-10-13T11:44:59.1396357",
    "timeZoneLastChange": "2016-10-13T16:28:01.7813851",
    "isCompleted": true,
    "merchantName": null,
    "userType": "",
    "roundingError": 0,
    "_accountInfo": {
        "HostName": "corebiz",
        "MainAccountName": "corebiz",
        "IsPersisted": true,
        "IsRemoved": false,
        "Id": "1807b6eb-838a-4576-a8db-9f0a60dcf1a3",
        "Cnpj": "05819843000138",
        "CompanyName": "corebiz",
        "TradingName": "corebiz",
        "AccountName": "corebiz",
        "DefaultUrl": null,
        "Address": null,
        "Number": null,
        "Complement": null,
        "District": null,
        "City": null,
        "State": null,
        "PostalCode": null,
        "Country": "Brasil",
        "Telephone": "989130660",
        "IsActive": true,
        "Sponsor": "ad68188f-947f-4e76-9b49-4b5c1162afe8",
        "Logo": null,
        "AppId": "01a214bd-96fd-4f3d-9f1a-ea81f540368b",
        "IsOperating": false,
        "LV": "LV-1000495",
        "Sigla": null
    }
}

$(document).ready(function() {

    var source = $('#results-template').html();
    var template = Handlebars.compile(source);

    $('body').append(template(context));

});
