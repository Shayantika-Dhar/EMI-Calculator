// app.js
new Vue({
    el: '#app',
    data: {
        loanAmount: null,
        loanTerm: null,
        interestRate: null,
        emiResult: null
    },
    methods: {
        calculateEMI() {
            // Retrieve values from data
            const principal = parseFloat(this.loanAmount);
            const annualInterestRate = parseFloat(this.interestRate);
            const tenureInMonths = parseInt(this.loanTerm);

            // Validate input
            if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(tenureInMonths)) {
                alert('Please enter valid numeric values.');
                return;
            }

            // Convert annual interest rate to monthly and calculate interest per month
            const monthlyInterestRate = (annualInterestRate / 100) / 12;

            // Calculate EMI using the formula: EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
            const emiNumerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureInMonths);
            const emiDenominator = Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1;
            const emi = emiNumerator / emiDenominator;

            // Create an amortization schedule array
            const amortizationSchedule = [];
            let balance = principal;

            for (let month = 1; month <= tenureInMonths; month++) {
                const interest = balance * monthlyInterestRate;
                const principalPayment = emi - interest;
                balance -= principalPayment;

                amortizationSchedule.push({
                    month: month,
                    emi: emi,
                    principal: principalPayment,
                    interest: interest,
                    balance: balance
                });
            }

            // Update emiResult with the calculated results
            this.emiResult = {
                emi: emi,
                totalInterest: (emi * tenureInMonths - principal),
                totalPayable: (emi * tenureInMonths),
                amortizationSchedule: amortizationSchedule
            };
        }
    }
});
