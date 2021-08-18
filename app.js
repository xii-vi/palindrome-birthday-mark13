var dobEnter = document.querySelector('#dob');
var chckBtn = document.querySelector('#find');
var output = document.querySelector('#output');


function rvrsStrng(str) {
    var listOfChars = str.split('');
    var reversedListOfChar = listOfChars.reverse();
    var reversedString = reversedListOfChar.join('');
    return reversedString;
}

function strPalindrome(str) {
    var reversedString = rvrsStrng(str);
    return str === reversedString;
}

function lpYear(year) {

    if (year % 400 === 0)
        return true;

    if (year % 100 === 0)
        return false;

    if (year % 4 === 0)
        return true;

    return false;
}

function dateString(date) {
    var dateStrg = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStrg.day = '0' + date.day;
    } else {
        dateStrg.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStrg.month = '0' + date.month;
    } else {
        dateStrg.month = date.month.toString();
    }

    dateStrg.year = date.year.toString();
    return dateStrg;
}

function dateFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function palindromeForFormats(date) {
    var dateFormatList = dateFormats(date);
    var palindromeList = [];

    for (var i = 0; i < dateFormatList.length; i++) {
        var result = strPalindrome(dateFormatList[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}

function nxtPalindrome(date) {

    var nextDate = nxtDate(date);
    var missedBy = 0;

    while (1) {
        missedBy++;
        var dateStr = dateString(nextDate);
        var resultList = palindromeForFormats(dateStr);

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [missedBy, nextDate];
            }
        }
        nextDate = nxtDate(nextDate);
    }
}

function nxtDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var dayM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (lpYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > dayM[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getlucky(e) {
    var bdayString = dobEnter.value;

    if (bdayString !== '') {
        var date = bdayString.split('-');
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2];

        var date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
        };

        var dateStr = dateString(date);
        var list = palindromeForFormats(dateStr);
        var isPalindrome = false;

        for (let i = 0; i < list.length; i++) {
            if (list[i]) {
                isPalindrome = true;
                break;
            }
        }

        if (!isPalindrome) {
            const [missedBy1, nextDate] = nxtPalindrome(date);
            output.innerText = "The nearest palindrome date is " + nextDate.day + '-' + nextDate.month + '-' + nextDate.year + " you missed by " + missedBy1 + " days.";

        } else {
            output.innerText = 'Yay! Your birthday is palindrome!';
        }
    }
}
chckBtn.addEventListener('click', getlucky);