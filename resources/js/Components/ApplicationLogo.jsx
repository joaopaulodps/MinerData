export default function ApplicationLogo(props) {
    const siteLogo = window.siteLogo ? `/storage/${window.siteLogo}` : null;

    return (
        
            <img src={`${siteLogo}`} alt="Logo atual" className="h-24" style={{ height: '60px' }} />
        
    );
}
