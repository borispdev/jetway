import * as yup from 'yup'
import moment from 'moment';

// Validation schemas used in various forms...

// Phone regex
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

// credit card regex
const creditCardRegex = /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/

// login form validation schema.
export const loginSchema = yup.object().shape({
    username: yup.string().required(), 
    password: yup.string().min(4).max(15).required()
});

// Flight search validation schema.
export const flightSearchSchema = yup.object().shape({
    origin: yup.string().required("Please select origin country."),
    destination: yup.string()
        .test('isInternational', 'Currently only international flights supported.', (value) => {
        return value !== origin;
    })
    .required("Please select destination country."),
    departure: yup.date().min(moment().toISOString(), "You cannot search past flights.").required('Valid date is required.'),
});

// New airline validation schema.
export const airlineSchema = yup.object().shape({
    name: yup.string().required("Airline name required."),
    country: yup.string().required("Please select country.")
});

// New customer validation schema.
export const customerSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    address: yup.string().required(),
    phone_no: yup.string().matches(phoneRegex, 'Invalid phone number').required(),
    credit_card: yup.string().matches(creditCardRegex, 'Invalid credit card number.').required()
});

// New admin validation schema.
export const adminSchema = yup.object().shape({
    first_name: customerSchema.first_name,
    last_name: customerSchema.last_name
});

// Register new user validation.
export const registerUserSchema = yup.object().shape({
    username: yup.string().min(3, "Username too short").max(60, "Username too long.").required("Username required."),
    email: yup.string().email().required("Email required"),
    password: yup.string().min(4, "Password too short").max(20, "Password too long"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], "Passwords don't match")
});

// New or edit existing flight validation.
export const flightSchema = yup.object().shape({
    origin: yup.string().required("Please select flight origin country."),
    destination: yup.string().required("Please select flight destination."),
    departure_time: yup.date().min(moment().toDate(), "Invalid flight departure time.").required("Valid flight departure time required"),
    landing_time: 
        yup.date()
        .min(moment().add(30, 'minutes').toDate(), "Landing can be at least half an hour after flight departure")
        .test({
            name: 'departure',
            message: "Landing cannot be earlier than departure.",
            test: function (value) {
                return value >= this.parent.departure_time;
            }
          
        })
        .required("Valid landing time required"),
    remaining_tickets: yup.number().min(0).max(850).required("Please set the available tickets.")
});