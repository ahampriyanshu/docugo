const addressOfLenderRaw = document.getElementById("addressOfLender");
const amountOfMortgageRaw = document.getElementById("amountOfMortgage");
const borrowerLawFirmNameRaw = document.getElementById("borrowerLawFirmName");
const closingDateRaw = document.getElementById("closingDate");
const dateOfSigningRaw = document.getElementById("dateOfSigning");
const fileNumberRaw = document.getElementById("fileNumber");
const instrumentNumberToDischargedRaw = document.getElementById("instrumentNumberToDischarged");
const interestRateRaw = document.getElementById("interestRate");
const nameOfLenderRaw = document.getElementById("nameOfLender");
const nameOfBorrowerRaw = document.getElementById("nameOfBorrower");
const municipalityOfSigningRaw = document.getElementById("municipalityOfSigning");
const maturityDateRaw = document.getElementById("maturityDate");
const propertyAddressRaw = document.getElementById("propertyAddress");
const propertyAddressFeildRaw = document.getElementById("propertyAddressFeild");
const priorityOfMortgageRaw = document.getElementById("priorityOfMortgage");
const prepaymentProvisionsRaw = document.getElementById("prepaymentProvisions");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
    const addressOfLender = addressOfLenderRaw.value;
    const amountOfMortgage = amountOfMortgageRaw.value;
    const borrowerLawFirmName = borrowerLawFirmNameRaw.value;
    const closingDate = closingDateRaw.value;
    const dateOfSigning = dateOfSigningRaw.value;
    const fileNumber = fileNumberRaw.value;
    const instrumentNumberToDischarged = instrumentNumberToDischargedRaw.value;
    const interestRate = interestRateRaw.value;
    const nameOfLender = nameOfLenderRaw.value;
    const nameOfBorrower = nameOfBorrowerRaw.value;
    const municipalityOfSigning = municipalityOfSigningRaw.value;
    const maturityDate = maturityDateRaw.value;
    const propertyAddress = propertyAddressRaw.value;
    const propertyAddressFeild = propertyAddressFeildRaw.value;
    const priorityOfMortgage = priorityOfMortgageRaw.value;
    const prepaymentProvisions = prepaymentProvisionsRaw.value;
 
    generate(addressOfLender, amountOfMortgage, borrowerLawFirmName, closingDate, dateOfSigning, fileNumber, instrumentNumberToDischarged, interestRate, nameOfLender, nameOfBorrower, municipalityOfSigning, maturityDate, propertyAddress, propertyAddressFeild, priorityOfMortgage, prepaymentProvisions, 1);
  });

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

function generate(addressOfLender, amountOfMortgage, borrowerLawFirmName, closingDate, dateOfSigning, fileNumber, instrumentNumberToDischarged, interestRate, nameOfLender, nameOfBorrower, municipalityOfSigning, maturityDate, propertyAddress, propertyAddressFeild, priorityOfMortgage, prepaymentProvisions, serialNumber) {
    loadFile("asset/sample.docx", function (error, content) {
        if (error) { throw error };

        // The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
            if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce(function (error, key) {
                    error[key] = value[key];
                    return error;
                }, {});
            }
            return value;
        }

        function errorHandler(error) {
            console.log(JSON.stringify({ error: error }, replaceErrors));

            if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors.map(function (error) {
                    return error.properties.explanation;
                }).join("\n");
                console.log('errorMessages', errorMessages);
                // errorMessages is a humanly readable message looking like this :
                // 'The tag beginning with "foobar" is unopened'
            }
            throw error;
        }

        var zip = new PizZip(content);
        var doc;
        try {
            doc = new window.docxtemplater(zip);
        } catch (error) {
            // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
            errorHandler(error);
        }

        doc.setData({
            address_of_lender: addressOfLender,
            amount_of_mortgage: amountOfMortgage,
            borrower_law_firm_name: borrowerLawFirmName,
            closing_date: closingDate,
            date_of_signing: dateOfSigning,
            file_number: fileNumber,
            instrument_number_to_discharged: instrumentNumberToDischarged,
            interest_rate: interestRate,
            name_of_lender: nameOfLender,
            name_of_borrower: nameOfBorrower,
            municipality_of_signing: municipalityOfSigning,
            maturity_date: maturityDate,
            property_address: propertyAddress,
            property_address_feild: propertyAddressFeild,
            priority_of_mortgage: priorityOfMortgage,
            prepayment_provisions: prepaymentProvisions,
        });
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
        }
        catch (error) {
            // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
            errorHandler(error);
            alert("Some error occured while parsing! Please try again");
        }

        const filename = nameOfBorrower + nameOfLender + "_" + serialNumber + ".doc";

        var out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })
        saveAs(out, filename)
    })
}