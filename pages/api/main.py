import json
import sqlite3
import sys

from pyasn1.compat.octets import null


# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
class Output:
    def __init__(self, validity, predictedResult, goldResult, executionAccuracy, error):
        self.validity = validity
        self.predictedResult = predictedResult
        self.goldResult = goldResult
        self.executionAccuracy = executionAccuracy
        self.error = error

    def __str__(self):
        return f"{self.validity}({self.predictedResult})({self.goldResult})({self.executionAccuracy})({self.error})"

# table order not considered
def executeSqlQuery(cur, goldQuery, predictedQuery):
    # gold query
    output=Output("true", "", "", 0, "")
    cur.execute(goldQuery)
    result1 = cur.fetchall()
    result2 = null
    try:
        cur.execute(predictedQuery)
        result2 = cur.fetchall()
    except Exception as e:
        output=Output("false", "", "", 0, e)
    equivalentCount = 0
    output=Output(output.validity, result1, result2, 0, output.error)
    total = len(result1)
    accuracy = 0
    if len(result1) >= len(result2):
        for res in result2:
            if res in result1:
                equivalentCount += 1
    else:
        total = len(result2)
        for res in result1:
            if res in result2:
                equivalentCount += 1

    accuracy = equivalentCount * 100 / total
    output=Output(output.validity, result1, result2, str(accuracy), output.error)
    print("Validity :" + output.validity)
    print("GoldRes :" + str(output.goldResult))
    print("PredictionRes :" + str(output.predictedResult))
    print("accuracy :" + output.executionAccuracy)
    print("error :" + str(output.error))
    # fetch all the data


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    # C:/Users/Admin/PycharmProjects/executionAccuracyChecker/assignment02db.db
    con = sqlite3.connect("D:/Alberta/CMPUT692/project/open-api-project/CMPUT692-project01/pages/api/assignment02db.db")
    cur = con.cursor()
    goldQuery = sys.argv[1]
    predictedQuery = sys.argv[2]
    executeSqlQuery(cur, goldQuery, predictedQuery)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
