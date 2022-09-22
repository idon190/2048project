function transister(index) {
  if (index == "on") {
    return 1;
  } else if (index == "off") {
    return 0;
  }
}

function notGate(index) {
  if (index == 0) {
    return 1;
  } else if (index == 1) {
    return 0;
  }
}

function andGate(i, j) {
  if (i == 1) {
    if (j == 1) {
      return 1;
    } else if (j == 0) {
      return 0;
    }
  } else if (i == 0) {
    return 0;
  }
}

function orGate(i, j) {
  if (i == 1) {
    return 1;
  } else if (i == 0) {
    if (j == 1) {
      return 1;
    }
    if (j == 0) {
      return 0;
    }
  }
}

function xorGate(i, j) {
  return andGate(notGate(andGate(i, j)), orGate(i, j));
}

function halfAdder(i, j) {
  return String(andGate(i, j)) + String(xorGate(i, j));
}

function secondAdder(i, j) {
  second = halfAdder(i.slice(0, 1), j.slice(0, 1));
  first = halfAdder(i.slice(1, 2), j.slice(1, 2));
  carry = halfAdder(second[1], first[0]);
  return (orGate(second[0], carry[0]) + carry[1] + first[1]);
}

function thirdAdder(i, j) {
  first = halfAdder(i.slice(2, 3), j.slice(2, 3));

  second = halfAdder(i.slice(1, 2), j.slice(1, 2));
  carry1 = halfAdder(second[1], first[0]);

  third = halfAdder(i.slice(0, 1), j.slice(0, 1));
  carry2 = halfAdder(third[1], orGate(second[0], carry1[0]));

  return (orGate(third[0], carry2[0]) + carry2[1] + carry1[1] + first[1]);
}


console.log(thirdAdder("000", "000"));
console.log(thirdAdder("001", "000"));
console.log(thirdAdder("001", "001"));
console.log(thirdAdder("010", "001"));
console.log(thirdAdder("010", "010"));
console.log(thirdAdder("011", "010"));
console.log(thirdAdder("011", "011"));
console.log(thirdAdder("100", "011"));
console.log(thirdAdder("100", "100"));
console.log(thirdAdder("101", "100"));
console.log(thirdAdder("101", "101"));
console.log(thirdAdder("110", "101"));
console.log(thirdAdder("110", "110"));
console.log(thirdAdder("111", "110"));
console.log(thirdAdder("111", "111"));
