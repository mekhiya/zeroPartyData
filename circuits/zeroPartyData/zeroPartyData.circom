pragma circom 2.0.0; 

include "../node_modules/circomlib/circuits/comparators.circom";

// Eligible for Offer 1.
// workType = 0,1 (Business Owner, Salaried Employees) 
// Age 18 or more
// Income 5000 or more

 // All Others eligible Offer 2

template IsEligible() {
     // private
    signal input workType;
    signal input age; 
    signal input income;

    // public signals - declared public on last line of this file
    signal input workTypeEligible;
    signal input ageEligible;
    signal input incomeEligible;

    // true/false
    signal output out;

    // **** Constraint 1 ****
    //If workType same as workTypeEligible
    workType === workTypeEligible;

    // max age 127
    component ageGreaterThan = GreaterThan(8); 
    ageGreaterThan.in[0] <== age;
    ageGreaterThan.in[1] <== ageEligible;
    
    // **** Constraint 2 ****
    // if age is greater than ageEligible, out value is 1 
    ageGreaterThan.out === 1;

    component incomeGreaterThan = GreaterThan(32); 
    incomeGreaterThan.in[0] <== income;
    incomeGreaterThan.in[1] <== incomeEligible;
    
    // **** Constraint 3 ****
    // if income is greater than incomeEligible, out value is 1 
    incomeGreaterThan.out === 1;

    signal intermediate;
    intermediate <== ageGreaterThan.out * incomeGreaterThan.out; 
    out <==  intermediate * workType;

    // **** Constraint 4 ****
    // All 3 conditions satisfied - salaried, age 18+ & meets income expectations
    out === 1;
}
component main {public [workTypeEligible, ageEligible, incomeEligible]} = IsEligible();
// component main {public [workTypeEligible, ageEligible, incomeEligible]} = IsEligible();