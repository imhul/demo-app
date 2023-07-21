import React, { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
// utils
import { delay } from 'utils/delay';

const portal = document.getElementById('portal');

const Portal: React.FC<PropsWithChildren> = ({ children }) => {
    const element = document.createElement('div');

    useEffect(() => {
        async function getPortal() {
            await delay(100);
            if (portal) portal.appendChild(element);
        }

        getPortal();

        return () => {
            if (portal && portal.contains(element))
                portal.removeChild(element);
        };
    }, []);

    return createPortal(children, element, 'portal');
};

export default Portal;
