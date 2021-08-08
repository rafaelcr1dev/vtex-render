var context = {
    "to": [
        {
            "name": "Corebiz |Leandro Ramos",
            "email": "leandro.ramos@corebiz.com.br"
        }
    ],
    "aditionalData": {
        "accessKey": "308852"
    },
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
