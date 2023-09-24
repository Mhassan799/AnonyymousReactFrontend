import React, { useState } from 'react';
import Name from './Name/Name';
import Image from './Image/Image';

const steps = {
    1: Name,
    2: Image,
};

const Authenticate = () => {

    const [step, setStep] = useState(1);
    const Step = steps[step];

    function onNext() {
        setStep(step + 1);
    }

    return <Step onNext={onNext} />;
};

export default Authenticate;