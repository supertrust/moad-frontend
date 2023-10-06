function Footer() {
  // Get the current URL pathname
  const currentURL = window.location.pathname;

  // Define the URL to hide the footer on
  const targetURL = "/dashboard/customer-service/guide/confirm";

  // Check if the current URL pathname matches the target URL
  const shouldHideFooter = currentURL === targetURL;

  // Conditionally render the footer based on the URL
  if (shouldHideFooter) {
    return null; // Hide the footer
  }

  // Render the footer for other pages
  return (
    <div>
      <div className="footer_menu pt-3 pb-4 flex items-center justify-between gap-3 px-[20px] bg-white w-full fixed bottom-0 border-t border-[#EBEDF4] lg:shadow-[0px_8px_24px_rgba(149,157,165,0.2)] lg:w-[50%] lg:mx-auto lg:left-0 lg:right-0 lg:rounded-2xl	lg:!bottom-[20px]">
        <div className="ftm_wrap flex items-center justify-center gap-1 flex-col">
          <div className="ftm_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M3.33335 4.99984H1.66669V16.6665C1.66669 17.5832 2.41669 18.3332 3.33335 18.3332H15V16.6665H3.33335V4.99984ZM16.6667 1.6665H6.66669C5.75002 1.6665 5.00002 2.4165 5.00002 3.33317V13.3332C5.00002 14.2498 5.75002 14.9998 6.66669 14.9998H16.6667C17.5834 14.9998 18.3334 14.2498 18.3334 13.3332V3.33317C18.3334 2.4165 17.5834 1.6665 16.6667 1.6665ZM16.6667 13.3332H6.66669V3.33317H16.6667V13.3332ZM8.33335 7.49984H15V9.1665H8.33335V7.49984ZM8.33335 9.99984H11.6667V11.6665H8.33335V9.99984ZM8.33335 4.99984H15V6.6665H8.33335V4.99984Z"
                fill="#C8C5CB"
              />
            </svg>
          </div>
          <div className="ftm_txt text-[12px] font-normal text-[#999]">광고리스트</div>
        </div>
        <div className="ftm_wrap flex items-center justify-center gap-1 flex-col">
          <div className="ftm_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M10.3333 2.5L1.16663 9.5L2.17496 10.825L3.66663 9.68333V17.5H17V9.68333L18.4916 10.8167L19.5 9.5L10.3333 2.5ZM15.3333 15.8333H5.33329V8.41667L10.3333 4.6L15.3333 8.41667V15.8333Z"
                fill="#C8C5CB"
              />
            </svg>
          </div>
          <div className="ftm_txt text-[12px] font-normal text-[#999]">홈</div>
        </div>
        <div className="ftm_wrap flex items-center justify-center gap-1 flex-col">
          <div className="ftm_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M16.4333 4.17516C16.2666 3.6835 15.8 3.3335 15.25 3.3335H6.08329C5.53329 3.3335 5.07496 3.6835 4.89996 4.17516L3.16663 9.16683V15.8335C3.16663 16.2918 3.54163 16.6668 3.99996 16.6668H4.83329C5.29163 16.6668 5.66663 16.2918 5.66663 15.8335V15.0002H15.6666V15.8335C15.6666 16.2918 16.0416 16.6668 16.5 16.6668H17.3333C17.7916 16.6668 18.1666 16.2918 18.1666 15.8335V9.16683L16.4333 4.17516ZM6.37496 5.00016H14.95L15.85 7.59183H5.47496L6.37496 5.00016ZM16.5 13.3335H4.83329V9.16683H16.5V13.3335Z"
                fill="#C8C5CB"
              />
              <path
                d="M6.91663 12.5002C7.60698 12.5002 8.16663 11.9405 8.16663 11.2502C8.16663 10.5598 7.60698 10.0002 6.91663 10.0002C6.22627 10.0002 5.66663 10.5598 5.66663 11.2502C5.66663 11.9405 6.22627 12.5002 6.91663 12.5002Z"
                fill="#C8C5CB"
              />
              <path
                d="M14.4166 12.5002C15.107 12.5002 15.6666 11.9405 15.6666 11.2502C15.6666 10.5598 15.107 10.0002 14.4166 10.0002C13.7263 10.0002 13.1666 10.5598 13.1666 11.2502C13.1666 11.9405 13.7263 12.5002 14.4166 12.5002Z"
                fill="#C8C5CB"
              />
            </svg>
          </div>
          <div className="ftm_txt text-[12px] font-normal text-[#999]">내활동</div>
        </div>
        <div className="ftm_wrap flex items-center justify-center gap-1 flex-col">
          <div className="ftm_icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M10 5.00016C10.9167 5.00016 11.6667 5.75016 11.6667 6.66683C11.6667 7.5835 10.9167 8.3335 10 8.3335C9.08337 8.3335 8.33337 7.5835 8.33337 6.66683C8.33337 5.75016 9.08337 5.00016 10 5.00016ZM10 12.5002C12.25 12.5002 14.8334 13.5752 15 14.1668V15.0002H5.00004V14.1752C5.16671 13.5752 7.75004 12.5002 10 12.5002ZM10 3.3335C8.15837 3.3335 6.66671 4.82516 6.66671 6.66683C6.66671 8.5085 8.15837 10.0002 10 10.0002C11.8417 10.0002 13.3334 8.5085 13.3334 6.66683C13.3334 4.82516 11.8417 3.3335 10 3.3335ZM10 10.8335C7.77504 10.8335 3.33337 11.9502 3.33337 14.1668V16.6668H16.6667V14.1668C16.6667 11.9502 12.225 10.8335 10 10.8335Z" fill="#C8C5CB"/>
</svg>
          </div>
          <div className="ftm_txt text-[12px] font-normal text-[#999]">마이페이지</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
