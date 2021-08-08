var context = {
    "package": {
        "items": [
            {
                "itemIndex": 0,
                "quantity": 1,
                "price": 100,
                "description": null
            }
        ],
        "courier": null,
        "invoiceNumber": "2134",
        "invoiceValue": 100,
        "invoiceUrl": null,
        "issuanceDate": "2017-04-18T03:00:00Z",
        "trackingNumber": null,
        "invoiceKey": null,
        "trackingUrl": null,
        "embeddedInvoice": null,
        "type": "Output",
        "courierStatus": null
    },
    "subjectItemAttachment": {
        "item": "Produto de teste Rec...",
        "totalItems": 1
    },
    "items": [
        {
            "additionalInfo": {
                "dimension": {
                    "cubicweight": 0.288,
                    "height": 12,
                    "length": 12,
                    "weight": 12,
                    "width": 12
                },
                "categoriesIds": "/14/",
                "productClusterId": "",
                "commercialConditionId": "1",
                "brandName": "Corebiz",
                "brandId": "2000003",
                "offeringInfo": null,
                "offeringType": null,
                "offeringTypeId": null
            },
            "sellerSku": "35",
            "priceValidUntil": "2018-04-18T22:14:47.9190822Z",
            "callCenterOperator": null,
            "commission": 0,
            "freightCommission": 0,
            "uniqueId": "227EDA7D253E4E118F848D09D769478D",
            "id": "35",
            "productId": "12",
            "refId": null,
            "ean": "10qweqweqweqqweqweqwe",
            "name": "Produto de teste Recorrência 3",
            "skuName": "Produto de teste Recorrência 3",
            "modalType": null,
            "tax": 0,
            "price": 100,
            "listPrice": 100,
            "manualPrice": null,
            "sellingPrice": 100,
            "rewardValue": 0,
            "isGift": false,
            "preSaleDate": null,
            "productCategoryIds": "/14/",
            "productCategories": {
                "14": "recorrencia"
            },
            "defaultPicker": null,
            "handlerSequence": 0,
            "handling": false,
            "quantity": 1,
            "seller": "1",
            "imageUrl": "http://corebiz.vteximg.com.br/arquivos/ids/156453-55-55/download.png",
            "detailUrl": "/produto-recorrencia3/p",
            "components": [],
            "bundleItems": [],
            "attachments": [
                {
                    "name": "Recorrência",
                    "content": {
                        "Periodo": "1 dia"
                    }
                }
            ],
            "itemAttachment": {
                "name": "Recorrência",
                "content": {
                    "Periodo": "1 dia"
                }
            },
            "attachmentOfferings": [
                {
                    "name": "Recorrência",
                    "required": false,
                    "schema": {
                        "Periodo": {
                            "maximumNumberOfCharacters": 10,
                            "domain": [
                                "1 dia",
                                " 1 semana",
                                " 2 semanas",
                                " 1 mês"
                            ]
                        }
                    }
                }
            ],
            "offerings": [],
            "priceTags": [],
            "availability": "available",
            "measurementUnit": "un",
            "unitMultiplier": 1
        }
    ],
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
                "transactionId": "02F03AAD07D442E5B5FA167E32F3719A",
                "merchantName": "COREBIZ",
                "payments": [
                    {
                        "id": "952135C852F8469A83A3AD919C37D083",
                        "paymentSystem": "2",
                        "paymentSystemName": "Visa",
                        "value": 100,
                        "installments": 1,
                        "connectorResponses": {
                            "Tid": "10069930690009A35F4A",
                            "ReturnCode": "0",
                            "Message": "Sucesso",
                            "authId": "123456",
                            "Nsu": "106356",
                            "Arp": "123456",
                            "eci": "7",
                            "lr": "00"
                        },
                        "referenceValue": 100,
                        "cardHolder": null,
                        "cardNumber": null,
                        "firstDigits": "492949",
                        "lastDigits": "5540",
                        "cvv2": null,
                        "expireMonth": null,
                        "expireYear": null,
                        "url": null,
                        "koinUrl": null,
                        "tid": "10069930690009A35F4A",
                        "redemptionCode": null,
                        "giftCardId": null,
                        "giftCardProvider": null,
                        "giftCardAsDiscount": null,
                        "group": "creditCard",
                        "dueDate": null,
                        "accountId": "4F6419F056494AEDB6EB85107704BA81",
                        "parentAccountId": "4F6419F056494AEDB6EB85107704BA81"
                    }
                ]
            }
        ]
    },
    "giftRegistryData": null,
    "receiptData": null,
    "contextData": null,
    "marketPlaceOrderId": "",
    "orderFormId": "b8bbec7888154aad92f55bfbbe8ce208",
    "sequence": "500165",
    "affiliateId": "",
    "status": "",
    "callCenterOperator": "",
    "userProfileId": "39fa38cd-14e1-43ee-93af-0c03c9f6cfd7",
    "hostName": "corebiz",
    "creationVersion": null,
    "creationEnvironment": null,
    "lastChangeVersion": null,
    "workflowInstanceId": null,
    "orderId": "725900899757-01",
    "orderGroup": "725900899757",
    "state": "payment-approved",
    "isCheckedIn": false,
    "sellerOrderId": "00-725900899757-01",
    "storeId": null,
    "value": 100,
    "totals": [
        {
            "id": "Items",
            "name": "Total dos Itens",
            "value": 100
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
        "email": "adriana.caldeira@vtex.com.br-85b.ct.vtex.com.br",
        "firstName": "Adriana",
        "lastName": "Caldeira",
        "document": "12262971706",
        "documentType": "cpf",
        "phone": "+5511985529999",
        "corporateName": null,
        "tradeName": null,
        "corporateDocument": null,
        "stateInscription": null,
        "corporatePhone": null,
        "isCorporate": false,
        "profileCompleteOnLoading": true,
        "profileErrorOnLoading": false
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
            "receiverName": "Adriana Caldeira",
            "addressId": "aeaa85a83e4649679afdebc69696979b",
            "postalCode": "04546-001",
            "city": "São Paulo",
            "state": "SP",
            "country": "BRA",
            "street": "Rua Casa do Ator",
            "number": "435",
            "neighborhood": "Vila Olímpia",
            "complement": null,
            "reference": null,
            "geoCoordinates": []
        },
        "logisticsInfo": [
            {
                "itemIndex": 0,
                "selectedSla": "Retirada",
                "slas": [
                    {
                        "id": "Retirada",
                        "deliveryChannel": null,
                        "name": "Retirada",
                        "deliveryIds": [
                            {
                                "courierId": "10",
                                "warehouseId": "1_1",
                                "dockId": "100577a",
                                "courierName": "Retira Posterior Loja",
                                "quantity": 1
                            }
                        ],
                        "shippingEstimate": "10bd",
                        "shippingEstimateDate": "2017-05-02T19:15:40.1363451Z",
                        "lockTTL": "8d",
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
                        "id": "Retirada na loja",
                        "deliveryChannel": null,
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
                        "shippingEstimate": "0d",
                        "shippingEstimateDate": null,
                        "lockTTL": "8d",
                        "availableDeliveryWindows": [
                            {
                                "startDateUtc": "2017-04-19T08:00:00+00:00",
                                "endDateUtc": "2017-04-19T18:00:00+00:00",
                                "price": 300,
                                "lisPrice": 300,
                                "tax": 0
                            },
                            {
                                "startDateUtc": "2017-04-19T00:30:00+00:00",
                                "endDateUtc": "2017-04-19T01:30:00+00:00",
                                "price": 3,
                                "lisPrice": 3,
                                "tax": 0
                            },
                            {
                                "startDateUtc": "2017-04-20T08:00:00+00:00",
                                "endDateUtc": "2017-04-20T18:00:00+00:00",
                                "price": 300,
                                "lisPrice": 300,
                                "tax": 0
                            }                        
                        ],
                        "deliveryWindow": null,
                        "price": 1000,
                        "listPrice": 1000,
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
                        "id": "Sedex",
                        "deliveryChannel": null,
                        "name": "Sedex",
                        "deliveryIds": [
                            {
                                "courierId": "1",
                                "warehouseId": "1_1",
                                "dockId": "1",
                                "courierName": "Sedex",
                                "quantity": 1
                            }
                        ],
                        "shippingEstimate": "3d",
                        "shippingEstimateDate": null,
                        "lockTTL": "8d",
                        "availableDeliveryWindows": [
                            {
                                "startDateUtc": "2017-04-22T07:00:00+00:00",
                                "endDateUtc": "2017-04-22T21:00:00+00:00",
                                "price": 2000,
                                "lisPrice": 2000,
                                "tax": 0
                            },
                            {
                                "startDateUtc": "2017-04-23T07:00:00+00:00",
                                "endDateUtc": "2017-04-23T21:00:00+00:00",
                                "price": 2000,
                                "lisPrice": 2000,
                                "tax": 0
                            }                          
                        ],
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
                "itemId": "35"
            }
        ],
        "availableAddresses": [
            {
                "addressType": "residential",
                "receiverName": "Adriana Caldeira",
                "addressId": "aeaa85a83e4649679afdebc69696979b",
                "postalCode": "04546-001",
                "city": "São Paulo",
                "state": "SP",
                "country": "BRA",
                "street": "Rua Casa do Ator",
                "number": "435",
                "neighborhood": "Vila Olímpia",
                "complement": null,
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
    "commercialConditionData": null,
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
    "openTextField": null,
    "customData": null,
    "hooksData": null,
    "changeData": null,
    "salesChannel": "1",
    "followUpEmail": "8a02ffb632c946caae4545ce6d0ac1fd@ct.vtex.com.br",
    "creationDate": "2017-04-18T22:14:58.4207753Z",
    "lastChange": "2017-04-18T22:15:38.7872343Z",
    "timeZoneCreationDate": "2017-04-18T19:14:58.4207753",
    "timeZoneLastChange": "2017-04-18T19:15:38.7872343",
    "isCompleted": true,
    "merchantName": null,
    "userType": "",
    "roundingError": 0,
    "allowEdition": false,
    "allowCancellation": false,
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
        "PostalCode": "06454-020",
        "Country": null,
        "Telephone": "1198913066",
        "IsActive": true,
        "Sponsor": "b90776e7-430b-439f-963e-02a05d5cc41b",
        "Logo": "logo_dark.png",
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
