import ReactGA from 'react-ga4';

// Replace this with your actual Google Analytics Measurement ID
const MEASUREMENT_ID = 'G-D2JV3RFSCX';

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label
  });
}; 