<script setup lang='ts'>

</script>

<template>
  <div class="basket-container">
    <div class="container-title">장바구니</div>
    <div class="basket-top-button-container">
      <div class="top-button">전체 선택</div>
      <div class="top-button">선택 삭제</div>
      <div class="top-button">전체 삭제</div>
    </div>
    <div class="container-line"></div>
    <table>
      <col width="80px" />
      <col width="200px" />
      <col width="300px" />
      <col width="200px" />
      <col width="200px" />
      <col width="70px" />
      <tr class="cart-table-data1">
        <td class="left-margin">선택</td>
        <td class="left-align"></td>
        <td class="left-align">상품명</td>
        <td class="center-text">수량</td>
        <td class="center-text">상품 가격</td>
        <td>총금액</td>
      </tr>
      <tr class="cart-table-data1">
        <td class="left-margin">
          <input
            class="basket-checkbox"
            type="checkbox"
          />
        </td>
        <td class="left-align">
          <img
            class="basket-img"
            src="@/assets/images/prod-img.png"
            alt=""
          />
        </td>
        <td class="left-align">
          <div class="basket-column">
            <h1>상품명</h1>
            <h2>상품 옵션</h2>
          </div>
        </td>
        <td>
          <div class="count-wrapper">
            <div class="count-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="2"
                viewBox="0 0 18 2"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1C18 1.26522 17.8946 1.51957 17.7071 1.70711C17.5196 1.89464 17.2652 2 17 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1Z"
                  fill="white"
                />
              </svg>
            </div>
            <div class="count-white">0</div>
            <div class="count-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M13 8H8V13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13V8H1C0.734784 8 0.48043 7.89464 0.292893 7.70711C0.105357 7.51957 0 7.26522 0 7C0 6.73478 0.105357 6.48043 0.292893 6.29289C0.48043 6.10536 0.734784 6 1 6H6V1C6 0.734784 6.10536 0.480429 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0C7.26522 0 7.51957 0.105357 7.70711 0.292893C7.89464 0.480429 8 0.734784 8 1V6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7C14 7.26522 13.8946 7.51957 13.7071 7.70711C13.5196 7.89464 13.2652 8 13 8Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </td>
        <td class="center-text">
          <span class="prod-price">상품 가격</span>
        </td>
        <td><span class="total-pay">총 금액</span></td>
      </tr>
      <tr>
        <td class="left-margin">
          <input
            class="basket-checkbox"
            type="checkbox"
          />
        </td>
        <td class="left-align">
          <img
            class="basket-img"
            src="@/assets/images/prod-img.png"
            alt=""
          />
        </td>
        <td class="left-align">
          <div class="basket-column">
            <h1>상품명</h1>
            <h2>상품 옵션</h2>
          </div>
        </td>
        <td>
          <div class="count-wrapper">
            <div class="count-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="2"
                viewBox="0 0 18 2"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1C18 1.26522 17.8946 1.51957 17.7071 1.70711C17.5196 1.89464 17.2652 2 17 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1Z"
                  fill="white"
                />
              </svg>
            </div>
            <div class="count-white">0</div>
            <div class="count-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M13 8H8V13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13V8H1C0.734784 8 0.48043 7.89464 0.292893 7.70711C0.105357 7.51957 0 7.26522 0 7C0 6.73478 0.105357 6.48043 0.292893 6.29289C0.48043 6.10536 0.734784 6 1 6H6V1C6 0.734784 6.10536 0.480429 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0C7.26522 0 7.51957 0.105357 7.70711 0.292893C7.89464 0.480429 8 0.734784 8 1V6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7C14 7.26522 13.8946 7.51957 13.7071 7.70711C13.5196 7.89464 13.2652 8 13 8Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </td>
        <td class="center-text">
          <span class="prod-price">상품 가격</span>
        </td>
        <td><span class="total-pay">총 금액</span></td>
      </tr>
    </table>
    <div class="basket-grey-container">
      <div class="grey-first-column">
        <div class="grey-small-text">총 주문 금액</div>
        <div class="grey-large-text">총 주문 금액</div>
      </div>
      <svg
        class="plus-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z"
          fill="black"
        />
        <path
          d="M17.1428 10.4762H22.8571V29.5238H17.1428V10.4762Z"
          fill="white"
        />
        <path
          d="M10.4761 17.1429H29.5237V22.8571H10.4761V17.1429Z"
          fill="white"
        />
      </svg>
      <div class="grey-second-column">
        <div class="grey-small-text">배송비</div>
        <div class="grey-large-text">배송비</div>
      </div>
      <svg
        class="equal-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 20C0 8.95455 8.95455 0 20 0C31.0455 0 40 8.95455 40 20C40 31.0455 31.0455 40 20 40C8.95455 40 0 31.0455 0 20ZM10.9091 23.6364C10.9091 23.1542 11.1006 22.6917 11.4416 22.3507C11.7826 22.0097 12.2451 21.8182 12.7273 21.8182H27.2727C27.7549 21.8182 28.2174 22.0097 28.5584 22.3507C28.8994 22.6917 29.0909 23.1542 29.0909 23.6364C29.0909 24.1186 28.8994 24.581 28.5584 24.922C28.2174 25.263 27.7549 25.4545 27.2727 25.4545H12.7273C12.2451 25.4545 11.7826 25.263 11.4416 24.922C11.1006 24.581 10.9091 24.1186 10.9091 23.6364ZM12.7273 14.5455C12.2451 14.5455 11.7826 14.737 11.4416 15.078C11.1006 15.419 10.9091 15.8814 10.9091 16.3636C10.9091 16.8458 11.1006 17.3083 11.4416 17.6493C11.7826 17.9903 12.2451 18.1818 12.7273 18.1818H27.2727C27.7549 18.1818 28.2174 17.9903 28.5584 17.6493C28.8994 17.3083 29.0909 16.8458 29.0909 16.3636C29.0909 15.8814 28.8994 15.419 28.5584 15.078C28.2174 14.737 27.7549 14.5455 27.2727 14.5455H12.7273Z"
          fill="black"
        />
      </svg>
      <div class="grey-third-column">
        <div class="grey-small-text">총 결제 금액</div>
        <div class="grey-large-text">총 결제 금액</div>
      </div>
    </div>
    <div class="purchase-button">구매하기</div>
  </div>
</template>

<style scoped>
@import "@/assets/css/cart.css";
</style>