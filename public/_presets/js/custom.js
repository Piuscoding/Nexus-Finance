// Function to move to previous input on backspace press
const moveToPreviousInput = (event, currentInput) => {
    if (event.keyCode === 8 && currentInput.selectionStart === 0) {
        const previousInput = currentInput.previousElementSibling;
        if (previousInput) {
            previousInput.focus();
            previousInput.setSelectionRange(previousInput.value.length, previousInput.value.length);
        }
    }
};

/**
 * Initializes the DOM content once it's fully loaded and sets up event listeners for various elements.
 */
document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();

    // Set the current date and time in the respective input fields
    const loginDateElement = document.getElementById('login-date');
    if (loginDateElement) {
        loginDateElement.value = now.toDateString();
    }

    const loginTimeElement = document.getElementById('login-time');
    if (loginTimeElement) {
        loginTimeElement.value = now.toTimeString();
    }

    // Set the greeting message based on the current time
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const hour = now.getHours();
        greetingElement.innerHTML = hour < 12 ? "<i class='bi-sunrise me-2'></i>Good morning," : hour < 18 ? "<i class='bi-cloud-sun me-2'></i>Good afternoon," : "<i class='bi-cloud-moon me-2'></i>Good evening,";
    }

    // **********************************LOGIN GREETINGS

    // Setup for the money transfer modal
    // const moneyTransferModal = document.getElementById('moneyTransferModal');
    // if (moneyTransferModal) {
    //     /**
    //      * Converts form data to JSON format.
    //      * @param {HTMLFormElement} form - The form element.
    //      * @returns {Object} The form data as JSON.
    //      */
    //     function getFormDataAsJson(form) {
    //         const formData = new FormData(form);
    //         return Object.fromEntries(formData.entries());
    //     }

    //     /**
    //      * Retrieves transaction code data as JSON.
    //      * @param {string} modalId - The ID of the modal containing the transaction code inputs.
    //      * @returns {Object} The transaction code data.
    //      */
    //     function getTransactionCodeData(modalId) {
    //         const form = document.querySelector(`#${modalId} form`);
    //         const inputs = form.querySelectorAll('input[name^="txn_code_"]');
    //         const data = Array.from(inputs).map(input => input.value).join('');
    //         const key = modalId.match(/txnCode(\d+)/)[1];
    //         return { [`txn_code_${key}`]: data };
    //     }

    //     /**
    //      * Creates hidden fields in a form.
    //      * @param {HTMLFormElement} form - The form element.
    //      * @param {Object} data - The data to be added as hidden fields.
    //      */
    //     function createHiddenFields(form, data) {
    //         Object.entries(data).forEach(([key, value]) => {
    //             const input = document.createElement('input');
    //             input.type = 'hidden';
    //             input.name = key;
    //             input.value = value;
    //             form.appendChild(input);
    //         });
    //     }

    //     /**
    //      * Updates the payload data for the given button and form.
    //      * @param {string} buttonId - The ID of the button triggering the update.
    //      * @param {string} formId - The ID of the form containing the data.
    //      * @param {string|null} transactionCode - The ID of the transaction code modal, if applicable.
    //      */
    //     function handlePayloadUpdate(buttonId, formId, transactionCode = null) {
    //         document.getElementById(buttonId).addEventListener('click', function () {
    //             const form = document.getElementById(formId);
    //             const data = transactionCode ? getTransactionCodeData(transactionCode) : getFormDataAsJson(form);
    //             if (transactionCode) {
    //                 historyStack.push(mergedData);
    //             }
    //             mergedData = { ...mergedData, ...data };
    //             this.setAttribute('data-bs-payload', JSON.stringify(mergedData));
    //         });
    //     }

    //     const historyStack = [];
    //     let mergedData = {};

    //     // Event listeners for updating the payload data
    //     handlePayloadUpdate('localTransferPayloadBtn', 'localTransferForm');
    //     handlePayloadUpdate('internationalTransferPayloadBtn', 'internationalTransferForm');
    //     handlePayloadUpdate('txnCode01PayloadBtn', null, 'txnCode01Modal');
    //     handlePayloadUpdate('txnCode02PayloadBtn', null, 'txnCode02Modal');
    //     handlePayloadUpdate('txnCode03PayloadBtn', null, 'txnCode03Modal');

    //     // Form submission handling for Transaction Code 03
    //     document.querySelector('#txnCode03PayloadBtn').addEventListener('click', function (event) {
    //         createHiddenFields(this, mergedData);
    //         document.getElementById('txnCode03PayloadBtn').classList.add('d-none');
    //         initializeTransfer.classList.remove('d-none');
    //         initializeTransfer.classList.add('disabled');

    //         // Automatically trigger click on initializeTransfer after 5 seconds
    //         setTimeout(function () {
    //             initializeTransfer.classList.remove('disabled');
    //             initializeTransfer.click();
    //         }, 5000); // 5000 milliseconds = 5 seconds
    //     });

    //     // Handle Go Back button functionality
    //     document.querySelectorAll('.txn-go-back-btn').forEach(button => {
    //         button.addEventListener('click', function () {
    //             if (historyStack.length > 0) {
    //                 mergedData = historyStack.pop();
    //             } else {
    //                 mergedData = {};
    //             }
    //         });
    //     });

    //     // Set up validation for each form container
    //     const setupInputValidation = (containerId, hiddenValueId, btnId, inputName, disabledBtnId) => {
    //         const container = document.getElementById(containerId);
    //         const proceedBtn = document.getElementById(btnId);
    //         const disabledBtn = document.getElementById(disabledBtnId);

    //         if (container) {
    //             /**
    //              * Checks if the entered value matches the hidden correct value.
    //              */
    //             const checkInputMatch = () => {
    //                 const hiddenValue = document.getElementById(hiddenValueId).value;
    //                 const inputs = document.getElementsByName(inputName);
    //                 const enteredValue = Array.from(inputs).map(input => input.value).join('');

    //                 if (enteredValue === hiddenValue) {
    //                     proceedBtn.classList.remove('d-none');
    //                     disabledBtn.classList.add('d-none');
    //                 } else {
    //                     proceedBtn.classList.add('d-none');
    //                     disabledBtn.classList.remove('d-none');
    //                 }
    //             };

    //             // Event listener for input fields to trigger check on input change
    //             document.querySelectorAll(`[name="${inputName}"]`).forEach(input => {
    //                 input.addEventListener('input', checkInputMatch);
    //             });

    //             // Event listener for the disabled button to alert if clicked
    //             disabledBtn.addEventListener('click', (event) => {
    //                 event.preventDefault();
    //                 alert('Invalid transaction code! Please try again.');
    //             });
    //         }
    //     };

    //     // Set up validation for each form container
    //     // setupInputValidation('txnCode01Container', 'txn-code-01-value', 'txnCode01PayloadBtn', 'txn_code_01', 'txnCode01DisabledBtn');
    //     // setupInputValidation('txnCode02Container', 'txn-code-02-value', 'txnCode02PayloadBtn', 'txn_code_02[]', 'txnCode02DisabledBtn');
    //     // setupInputValidation('txnCode03Container', 'txn-code-03-value', 'txnCode03PayloadBtn', 'txn_code_03[]', 'txnCode03DisabledBtn');
    // }

    // // Close toast notification
    // const closeToastBtn = document.getElementById('closeToastBtn');
    // if (closeToastBtn) {
    //     closeToastBtn.addEventListener('click', function () {
    //         document.getElementById('siteToast').classList.remove('d-block');
    //     });
    // }
    // ***********************TRANSACTION CODE *************************//

    
    // Loan request form handling
    const loanRequestForm = document.getElementById('loanRequestForm');
    if (loanRequestForm) {
        const loanAmountInput = document.getElementById('loan_amount');
        const loanCategorySelect = document.getElementById('loan_category');
        const loanInterestAmountInput = document.getElementById('loan_interest_amount');
        const loanInterestPercentageInput = document.getElementById('loan_interest_percentage');

        const interestRates = {
            "Mortgage Loan": 4,
            "Business Loan": 8,
            "Personal Loan": 11,
            "Student Loan": 6.75,
            "Home Loan": 3.5,
            "Auto Loan": 5,
            "Payday Loan": 400,
            "Medical Loan": 10,
            "Credit Card Loan": 17,
            "Debt Consolidation Loan": 12
        };

        /**
         * Updates the loan interest fields based on the selected loan category and amount.
         */
        function updateInterestFields() {
            const loanAmount = parseFloat(loanAmountInput.value);
            const loanCategory = loanCategorySelect.value;

            if (!isNaN(loanAmount) && loanCategory in interestRates) {
                const interestRate = interestRates[loanCategory];
                const interestAmount = (loanAmount * interestRate) / 100;
                loanInterestPercentageInput.value = interestRate.toFixed(2) + '%';
                loanInterestAmountInput.value = '$' + interestAmount.toFixed(2);
            } else {
                loanInterestPercentageInput.value = '';
                loanInterestAmountInput.value = '';
            }
        }

        loanAmountInput.addEventListener('input', updateInterestFields);
        loanCategorySelect.addEventListener('change', updateInterestFields);
    }

    // Transaction receipt preview modal setup
    const txnReceiptPreviewModal = document.getElementById('txnReceiptPreviewModal');
    if (txnReceiptPreviewModal) {
        txnReceiptPreviewModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            const payload = button.getAttribute('data-bs-txn-payload');
            const transactionData = JSON.parse(payload);

            const modalBody = txnReceiptPreviewModal.querySelector('#txnReceiptPreviewBody');

            const transactionDetails = `
                <div class="card bg-light-subtle rounded-3 mb-3 border-0">
                    <div class="card-body p-3">
                        <div class="card-body bg-light rounded-3 text-center fs-4 fw-light p-2 border">Transaction Details</div>
                        <div class="card-body px-2">
                            <div class="d-flex mb-3">
                                <span class="small me-auto">Transaction ID:</span>
                                <span class="small fw-bold">${transactionData.transaction_id}</span>
                            </div>
                            <div class="d-flex mb-3">
                                <span class="small me-auto">Date Initialized:</span>
                                <span class="small fw-bold">${transactionData.date_initialized}</span>
                            </div>
                            <div class="d-flex mb-3">
                                <span class="small me-auto">Category:</span>
                                <span class="small fw-bold text-primary">${transactionData.txn_category} Transaction</span>
                            </div>
                            <div class="d-flex mb-3">
                                <span class="small me-auto">Beneficiary:</span>
                                <span class="small fw-bold">${transactionData.beneficiary}</span>
                            </div>
                            <hr class="border border-top-0 border-dashed my-5">
                            <div class="d-flex mb-3">
                                <span class="small me-auto">E-Bank Name:</span>
                                <span class="small fw-bold">${transactionData.ebank_name}</span>
                            </div>
                            <div class="d-flex mb-3">
                                <span class="me-auto">Balance BT:</span>
                                <span class="fw-bold">$${parseFloat(transactionData.balance_bt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div class="d-flex mb-3">
                                <span class="me-auto">Balance AT:</span>
                                <span class="fw-bold">$${parseFloat(transactionData.balance_at).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <hr class="border border-top-0 border-dashed my-5">
                            <div class="d-flex mb-3">
                                <span class="me-auto">Amount:</span>
                                <span class="fw-bold">$${parseFloat(transactionData.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div class="d-flex">
                                <span class="me-auto">TXN Status:</span>
                                <span class="badge fw-bold bg-light rounded-1 text-primary border-primary border">${transactionData.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-light-subtle rounded-3 border-0">
                    <div class="card-body p-3">
                        <span class="small me-auto fw-bold">Description:</span>
                        <span class="small fw-light">${transactionData.description}</span>
                    </div>
                </div>
            `;

            modalBody.innerHTML = transactionDetails;
        });
    }

    // Loan details preview modal setup
    const loanDetailsPreviewModal = document.getElementById('loanDetailsPreviewModal');
    if (loanDetailsPreviewModal) {
        loanDetailsPreviewModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            const payload = button.getAttribute('data-bs-loan-payload');
            const loanData = JSON.parse(payload);

            const modalBody = loanDetailsPreviewModal.querySelector('#loanDetailsPreviewBody');

            const loanDetails = `
                <div class="card bg-light-subtle rounded-3 mb-3 border-0">
                    <div class="card-body p-3">
                        <div class="card-body bg-light rounded-3 text-center fs-4 fw-light p-2 border">Loan Details</div>
                        <div class="card-body px-2">
                            <div class="d-flex mb-3">
                                <span class="small me-auto">loan ID:</span>
                                <span class="small fw-bold">${loanData.loan_id}</span>
                            </div>
                            <div class="d-flex mb-3">
                                <span class="small me-auto">Date Initialized:</span>
                                <span class="small fw-bold">${loanData.date_initialized}</span>
                            </div>
                            <div class="d-flex mb-3">
                                <span class="small me-auto">Category:</span>
                                <span class="small fw-bold text-primary">${loanData.category}</span>
                            </div>
                            <hr class="border border-top-0 border-dashed my-5">
                            <div class="d-flex mb-3">
                                <span class="small me-auto">Duration:</span>
                                <span class="small fw-bold">${loanData.duration}</span>
                            </div>
                            <div class="d-flex mb-3">
                                <span class="me-auto">Interest:</span>
                                <span class="small fw-bold">${loanData.interest}%</span>
                            </div>
                            <div class="d-flex mb-3">
                                <span class="me-auto">Repayment:</span>
                                <span class="fw-bold">$${parseFloat(loanData.repayment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div class="d-flex mb-3">
                                <span class="me-auto">Re-Payment Status:</span>
                                <span class="badge fw-light bg-light rounded-1 text-success border-success border">${loanData.payment_status}</span>
                            </div>
                            <hr class="border border-top-0 border-dashed my-5">
                            <div class="d-flex mb-3">
                                <span class="me-auto">Loan Status:</span>
                                <span class="badge fw-light bg-light rounded-1 text-primary border-primary border">${loanData.status}</span>
                            </div>
                            <div class="d-flex">
                                <span class="me-auto">Amount:</span>
                                <span class="fw-bold">$${parseFloat(loanData.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-light-subtle rounded-3 border-0">
                    <div class="card-body p-3">
                        <span class="small me-auto fw-bold">Reason For Loan:</span>
                        <span class="small fw-light">${loanData.reason}</span>
                    </div>
                </div>
            `;

            modalBody.innerHTML = loanDetails;
        });
    }

    // Initialize vertex table if present
    const vertexTable = document.getElementById('vertex-table');
    if (vertexTable) {
        VertexTable.init('searchInput', 'entriesInfo', 'tablePagination');
    }

    // Initialize Google Translate element
    const googleTranslateElement = document.getElementById('google_translate_element');
    if (googleTranslateElement) {
        new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    }
});
