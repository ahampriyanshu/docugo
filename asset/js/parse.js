window.addEventListener("load", function () {
    document.getElementById("upload").addEventListener("click", function () {
        var fileUpload = document.getElementById("file");
        var regex = /.+\.(xlsx|xls)$/i;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("Please update/change your browser");
            }
        } else {
            alert("Please upload a valid .xls/.xlsx file or rename your file.");
        }

        function ProcessExcel(data) {
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            var firstSheet = workbook.SheetNames[0];
            var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

            for (var i = 0; i < excelRows.length; i++) {
                generate(excelRows[i].nameOfBorrower, excelRows[i].propertyAddress, excelRows[i].nameOfLender, excelRows[i].addressOfLender, excelRows[i].municipalityOfSigning, excelRows[i].dateOfSigning, excelRows[i].priorityOfMortgage, excelRows[i].closingDate, excelRows[i].fileNumber, excelRows[i].borrowerLawFirmName, excelRows[i].borrowerLawyerName, excelRows[i].amountOfMortgageWords, excelRows[i].amountOfMortgage, excelRows[i].maturityDate, excelRows[i].interestRate, excelRows[i].prepaymentProvisions, excelRows[i].instrumentNumberToDischarged, i);
            }
        };
    })
})

