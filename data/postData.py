if True:
    import csv
    import pprint
    import requests
    
    apiEndpoint = r'http://localhost:3000/api/states'
    
    stateAbbreviationList = [
        'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC',
        'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN',
        'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN',
        'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ',
        'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR',
        'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
        'WA', 'WI', 'WV', 'WY', 'allUS'
    ]
    
    def createDataObject():
        dataObject = {}
        for stateAbbreviation in stateAbbreviationList:
            dataObject[stateAbbreviation] = {}
        return dataObject
    
    def addCsvByPropertyName(dataObject, csvFileName, propertyName):
        with open('auto_delinq-area_report_by_year.csv', newline='') as csvfile:
            csvreader = csv.reader(csvfile)
            rowHeaders = []
            for row in csvreader:
                if (row[0] == 'state'):
                    rowHeaders = row
                    continue
                else:
                    stateAbbreviation = row[0]
                    dataObject[stateAbbreviation][propertyName] = []
                    for i in range(1, len(row)):
                        dataObject[stateAbbreviation][propertyName].append(row[i])
    
    dataObject = createDataObject()
    auto = addCsvByPropertyName(dataObject, 'auto-area_report_by_year.csv', 'auto')
    autoDelinq = addCsvByPropertyName(dataObject, 'auto_delinq-area_report_by_year.csv', 'autoDelinq')
    creditCard = addCsvByPropertyName(dataObject, 'credit_card-area_report_by_year.csv', 'creditCard')
    creditCardDelinq = addCsvByPropertyName(dataObject, 'credit_card_delinq-area_report_by_year.csv', 'creditCardDelinq')
    mortgage = addCsvByPropertyName(dataObject, 'mortgage-area_report_by_year.csv', 'mortgage')
    mortgageDelinq = addCsvByPropertyName(dataObject, 'mortgage_delinq-area_report_by_year.csv', 'mortgageDelinq')
    population = addCsvByPropertyName(dataObject, 'population-area_report_by_year.csv', 'population')
    studentLoan = addCsvByPropertyName(dataObject, 'student_loan-area_report_by_year.csv', 'studentLoan')
    studentLoanDelinq = addCsvByPropertyName(dataObject, 'student_loan_delinq-area_report_by_year.csv', 'studentLoanDelinq')
    total = addCsvByPropertyName(dataObject, 'total-area_report_by_year.csv', 'total')
    
    for postalCode in dataObject.keys():
        dataObject[postalCode]['postalCode'] = postalCode
        requests.post(apiEndpoint, json=dataObject[postalCode])

