<script setup lang='ts'>
</script>

<template>
  <div class="main-container">
    <div class="md-container">
      <div class="md-prod-container">
        <div class="info-wrapper">
          <RouterLink class='banner' to='/auctions'>
            <img class='banner-img' src='@/assets/images/bid-banner.png' alt=''>
          </RouterLink>
          <RouterLink class='banner' to='/ootds'>
            <img class='banner-img' src="@/assets/images/ootd-banner.png" alt="" />
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="new-container">
      <h1>신상품</h1>
      <div class="new-more-wrapper">
        <RouterLink to="/new-products" class="new-more-btn-wrapper">
          <span>더보기</span>
          <svg
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.998998 19.9999C0.867977 20.0015 0.738073 19.9757 0.617638 19.9241C0.497202 19.8725 0.388901 19.7962 0.299699 19.7002C-0.0998997 19.3006 -0.0998997 18.6813 0.299699 18.2817L8.59138 9.98997L0.299699 1.71828C-0.0998997 1.31868 -0.0998997 0.699298 0.299699 0.299699C0.699298 -0.0998998 1.31868 -0.0998998 1.71828 0.299699L10.6893 9.31066C11.0889 9.71026 11.0889 10.3296 10.6893 10.7292L1.6983 19.7002C1.4985 19.9 1.23876 19.9999 0.998998 19.9999Z"
              fill="#C6C6C6"
            />
          </svg>
        </RouterLink>
      </div>
      <div class="new-prod-wrapper">
        <svg
          class="back-btn"
          width="17"
          height="30"
          viewBox="0 0 17 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.985 29.97C14.7885 29.9724 14.5936 29.9337 14.413 29.8562C14.2323 29.7788 14.0699 29.6644 13.9361 29.5205L0.44955 16.034C-0.14985 15.4346 -0.14985 14.5055 0.44955 13.9061L13.9361 0.44955C14.5355 -0.14985 15.4645 -0.14985 16.0639 0.44955C16.6633 1.04895 16.6633 1.97802 16.0639 2.57742L3.62637 14.985L16.0639 27.4226C16.6633 28.022 16.6633 28.951 16.0639 29.5504C15.7642 29.8501 15.3746 30 15.015 30L14.985 29.97Z"
            fill="#4D4D4D"
          />
        </svg>

        <div class="new-prod-grid">
          <div v-for="n in 4" class="new-prod-info">
            <img src="@/assets/images/prod-img.png" alt="" />
            <h1>BRAND</h1>
            <h2>상품명</h2>
            <h3>가격</h3>
          </div>
        </div>
        <svg
          class="front-btn"
          width="17"
          height="30"
          viewBox="0 0 17 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z"
            fill="#4D4D4D"
          />
        </svg>
      </div>
    </div>

    <div class="new-container">
      <h1>베스트 상품</h1>
      <div class="new-more-wrapper">
        <RouterLink to="/best-products" class="new-more-btn-wrapper">
          <span>더보기</span>
          <svg
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.998998 19.9999C0.867977 20.0015 0.738073 19.9757 0.617638 19.9241C0.497202 19.8725 0.388901 19.7962 0.299699 19.7002C-0.0998997 19.3006 -0.0998997 18.6813 0.299699 18.2817L8.59138 9.98997L0.299699 1.71828C-0.0998997 1.31868 -0.0998997 0.699298 0.299699 0.299699C0.699298 -0.0998998 1.31868 -0.0998998 1.71828 0.299699L10.6893 9.31066C11.0889 9.71026 11.0889 10.3296 10.6893 10.7292L1.6983 19.7002C1.4985 19.9 1.23876 19.9999 0.998998 19.9999Z"
              fill="#C6C6C6"
            />
          </svg>
        </RouterLink>
      </div>
      <div class="new-prod-wrapper">
        <svg
          class="back-btn"
          width="17"
          height="30"
          viewBox="0 0 17 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.985 29.97C14.7885 29.9724 14.5936 29.9337 14.413 29.8562C14.2323 29.7788 14.0699 29.6644 13.9361 29.5205L0.44955 16.034C-0.14985 15.4346 -0.14985 14.5055 0.44955 13.9061L13.9361 0.44955C14.5355 -0.14985 15.4645 -0.14985 16.0639 0.44955C16.6633 1.04895 16.6633 1.97802 16.0639 2.57742L3.62637 14.985L16.0639 27.4226C16.6633 28.022 16.6633 28.951 16.0639 29.5504C15.7642 29.8501 15.3746 30 15.015 30L14.985 29.97Z"
            fill="#4D4D4D"
          />
        </svg>

        <div class="new-prod-grid">
          <div v-for="n in 4" class="new-prod-info">
            <img src="@/assets/images/prod-img.png" alt="" />
            <h1>BRAND</h1>
            <h2>상품명</h2>
            <h3>가격</h3>
          </div>
        </div>
        <svg
          class="front-btn"
          width="17"
          height="30"
          viewBox="0 0 17 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z"
            fill="#4D4D4D"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/home.css';
</style>
