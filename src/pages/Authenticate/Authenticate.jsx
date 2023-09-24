import React, { useState } from 'react';
import StepPhoneEmail from '../../Steps/StepPhoneEmail/StepPhoneEmail';
import StepOtp from '../../Steps/SendOtp/SendOtp';
import {useSelector} from 'react-redux'

const steps = {
    1: StepPhoneEmail,
    2: StepOtp,
};

const Authenticate = () => {
    const {isAuth,user} = useSelector((state)=>state.auth)

    const [step, setStep] = useState(1);
    const Step = steps[step];

    function onNext() {
        setStep(step + 1);
    }

    return <Step onNext={onNext} />;
};

export default Authenticate;

