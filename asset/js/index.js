if('serviceWorker' in navigator){
  try {
    navigator.serviceWorker.register('sw.js');
    console.log("Service Worker Registered Successfully");
  } catch (error) {
    console.log("Service Worker Registration Failed");
  }
}

const addressOfLenderRaw = document.getElementById("addressOfLender");
const amountOfMortgageRaw = document.getElementById("amountOfMortgage");
const amountOfMortgageWordsRaw = document.getElementById("amountOfMortgageWords");
const borrowerLawFirmNameRaw = document.getElementById("borrowerLawFirmName");
const borrowerLawyerNameRaw = document.getElementById("borrowerLawyerName");
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
const priorityOfMortgageRaw = document.getElementById("priorityOfMortgage");
const prepaymentProvisionsRaw = document.getElementById("prepaymentProvisions");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
    const addressOfLender = addressOfLenderRaw.value;
    const amountOfMortgage = amountOfMortgageRaw.value;
    const amountOfMortgageWords = amountOfMortgageWordsRaw.value;
    const borrowerLawFirmName = borrowerLawFirmNameRaw.value;
    const borrowerLawyerName = borrowerLawyerNameRaw.value;
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
    const priorityOfMortgage = priorityOfMortgageRaw.value;
    const prepaymentProvisions = prepaymentProvisionsRaw.value;
    generate(nameOfBorrower, propertyAddress, nameOfLender, addressOfLender,  municipalityOfSigning, dateOfSigning, priorityOfMortgage,  closingDate, fileNumber,  borrowerLawFirmName, borrowerLawyerName, amountOfMortgageWords, amountOfMortgage, maturityDate, interestRate,  prepaymentProvisions, instrumentNumberToDischarged ,1);
  });

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

function generate(nameOfBorrower, propertyAddress, nameOfLender, addressOfLender,  municipalityOfSigning, dateOfSigning, priorityOfMortgage,  closingDate, fileNumber,  borrowerLawFirmName, borrowerLawyerName, amountOfMortgageWords, amountOfMortgage, maturityDate, interestRate,  prepaymentProvisions, instrumentNumberToDischarged , serialNumber) {
    loadFile("asset/sample.docx", function (error, content) {
        if (error) { throw error };

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
            alert("Some error occured while parsing! Please try again");
            if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors.map(function (error) {
                    return error.properties.explanation;
                }).join("\n");
                console.log('errorMessages', errorMessages);
            }
            throw error;
        }

        var zip = new PizZip(content);
        var doc;
        try {
            doc = new window.docxtemplater(zip);
        } catch (error) {
            errorHandler(error);
        }

        doc.setData({
            address_of_lender: addressOfLender,
            amount_of_mortgage: amountOfMortgage,
            amount_of_mortgage_words: amountOfMortgageWords,
            borrower_lawyer_name: borrowerLawyerName,
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
            priority_of_mortgage: priorityOfMortgage,
            prepayment_provisions: prepaymentProvisions,
        });
        try {
           doc.render();
        }
        catch (error) {
            // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
            errorHandler(error);
        }

        const filename = nameOfBorrower + nameOfLender + "_" + serialNumber + ".doc";

        var out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })
        saveAs(out, filename)
    })
}

const file = document.querySelector('#file');
file.addEventListener('change', (e) => {
  const [file] = e.target.files;
  const { name: fileName, size } = file;
  const fileSize = (size / 1000).toFixed(2);
  const fileNameAndSize = `${fileName} - ${fileSize}KB`;
  document.querySelector('.file-name').textContent = fileNameAndSize;
});

var navMenuDiv = document.getElementById("nav-content");
var navMenu = document.getElementById("nav-toggle");

document.onclick = check;
function check(e) {
  var target = (e && e.target);
  if (!checkParent(target, navMenuDiv)) {
    if (checkParent(target, navMenu)) {
      if (navMenuDiv.classList.contains("hidden")) {
        navMenuDiv.classList.remove("hidden");
      } else {
        navMenuDiv.classList.add("hidden");
      }
    } else {
      navMenuDiv.classList.add("hidden");
    }
  }
}
function checkParent(t, elm) {
  while (t.parentNode) {
    if (t == elm) {
      return true;
    }
    t = t.parentNode;
  }
  return false;
}