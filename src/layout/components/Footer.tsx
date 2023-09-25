function Footer() {
  // Get the current URL pathname
  const currentURL = window.location.pathname;

  // Define the URL to hide the footer on
  const targetURL = '/dashboard/customer-service/guide/confirm';

  // Check if the current URL pathname matches the target URL
  const shouldHideFooter = currentURL === targetURL;

  // Conditionally render the footer based on the URL
  if (shouldHideFooter) {
    return null; // Hide the footer
  }

  // Render the footer for other pages
  return (
    <div id="inner_footer" className="inner-footer" style={{ width: '100%' }}>
      <span>2023@copyright. All rights reserved</span>
    </div>
  );
}

export default Footer;
