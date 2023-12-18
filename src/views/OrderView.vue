<script setup lang="ts"></script>

<template>
  <div class="main-container">
    <h1>주문/결제</h1>
    <div class="center-container">
      <div class="center-left-container">
        <div class="purchase-list-container">
          <div class="container-title">주문상품 정보</div>
          <div class="line"></div>
          <div class="shop-wrapper">
            <div class="shop-name-div">
              <span>가게 명1</span>
              <span>배송: 배송비</span>
            </div>
            <div class="shop-prod-div">
              <svg
                class="prod-delete-button"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.488464 0.508303C0.800696 0.196165 1.22412 0.0208154 1.66561 0.0208154C2.10711 0.0208154 2.53053 0.196165 2.84276 0.508303L9.99057 7.65611L17.1384 0.508303C17.292 0.349279 17.4757 0.222436 17.6788 0.135175C17.882 0.0479149 18.1004 0.00198396 18.3215 6.28652e-05C18.5426 -0.00185823 18.7618 0.0402685 18.9665 0.123986C19.1711 0.207703 19.357 0.331334 19.5133 0.487664C19.6696 0.643995 19.7933 0.829895 19.877 1.03452C19.9607 1.23914 20.0028 1.45838 20.0009 1.67946C19.999 1.90054 19.9531 2.11902 19.8658 2.32215C19.7785 2.52529 19.6517 2.70901 19.4927 2.8626L12.3449 10.0104L19.4927 17.1582C19.796 17.4722 19.9638 17.8928 19.96 18.3294C19.9562 18.7659 19.7811 19.1835 19.4724 19.4922C19.1637 19.8009 18.7461 19.976 18.3095 19.9798C17.873 19.9836 17.4524 19.8158 17.1384 19.5125L9.99057 12.3647L2.84276 19.5125C2.52874 19.8158 2.10816 19.9836 1.6716 19.9798C1.23505 19.976 0.817448 19.8009 0.508745 19.4922C0.200043 19.1835 0.0249367 18.7659 0.0211432 18.3294C0.0173496 17.8928 0.185172 17.4722 0.488464 17.1582L7.63627 10.0104L0.488464 2.8626C0.176326 2.55037 0.000976562 2.12695 0.000976562 1.68545C0.000976562 1.24396 0.176326 0.820534 0.488464 0.508303Z"
                  fill="#808080"
                />
              </svg>
              <div class="shop-prod-inner-div">
                <h1>상품명1</h1>
                <div class="shop-prod-inner-info">
                  <img class="info-img" src="@/assets/images/prod-img.png" alt="" />
                  <div class="info-first-col">
                    <div class="info-first-col-first-row">
                      <div class="button1">옵션</div>
                      옵션명
                    </div>
                    <div class="info-first-col-first-row">
                      <div class="button1">수량</div>
                      수량
                    </div>
                    <div class="button2"><span>옵션/수량 변경</span></div>
                  </div>
                  <div class="info-second-col">
                    <span>상품금액</span>
                    <span>할인금액</span>
                    <span>할인적용금액</span>
                  </div>
                  <div class="info-third-col">
                    <span>상품금액</span>
                    <span><div class="highlight1">할인금액</div></span>
                    <span> <div class="highlight2">할인적용금액</div></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="shop-prod-div">
              <svg
                class="prod-delete-button"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.488464 0.508303C0.800696 0.196165 1.22412 0.0208154 1.66561 0.0208154C2.10711 0.0208154 2.53053 0.196165 2.84276 0.508303L9.99057 7.65611L17.1384 0.508303C17.292 0.349279 17.4757 0.222436 17.6788 0.135175C17.882 0.0479149 18.1004 0.00198396 18.3215 6.28652e-05C18.5426 -0.00185823 18.7618 0.0402685 18.9665 0.123986C19.1711 0.207703 19.357 0.331334 19.5133 0.487664C19.6696 0.643995 19.7933 0.829895 19.877 1.03452C19.9607 1.23914 20.0028 1.45838 20.0009 1.67946C19.999 1.90054 19.9531 2.11902 19.8658 2.32215C19.7785 2.52529 19.6517 2.70901 19.4927 2.8626L12.3449 10.0104L19.4927 17.1582C19.796 17.4722 19.9638 17.8928 19.96 18.3294C19.9562 18.7659 19.7811 19.1835 19.4724 19.4922C19.1637 19.8009 18.7461 19.976 18.3095 19.9798C17.873 19.9836 17.4524 19.8158 17.1384 19.5125L9.99057 12.3647L2.84276 19.5125C2.52874 19.8158 2.10816 19.9836 1.6716 19.9798C1.23505 19.976 0.817448 19.8009 0.508745 19.4922C0.200043 19.1835 0.0249367 18.7659 0.0211432 18.3294C0.0173496 17.8928 0.185172 17.4722 0.488464 17.1582L7.63627 10.0104L0.488464 2.8626C0.176326 2.55037 0.000976562 2.12695 0.000976562 1.68545C0.000976562 1.24396 0.176326 0.820534 0.488464 0.508303Z"
                  fill="#808080"
                />
              </svg>
              <div class="shop-prod-inner-div">
                <h1>상품명1</h1>
                <div class="shop-prod-inner-info">
                  <img class="info-img" src="@/assets/images/prod-img.png" alt="" />
                  <div class="info-first-col">
                    <div class="info-first-col-first-row">
                      <div class="button1">옵션</div>
                      옵션명
                    </div>
                    <div class="info-first-col-first-row">
                      <div class="button1">수량</div>
                      수량
                    </div>
                    <div class="button2"><span>옵션/수량 변경</span></div>
                  </div>
                  <div class="info-second-col">
                    <span>상품금액</span>
                    <span>할인금액</span>
                    <span>할인적용금액</span>
                  </div>
                  <div class="info-third-col">
                    <span>상품금액</span>
                    <span><div class="highlight1">할인금액</div></span>
                    <span> <div class="highlight2">할인적용금액</div></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="shop-wrapper">
            <div class="shop-name-div">
              <span>가게 명2</span>
              <span>배송: 배송비</span>
            </div>
            <div class="shop-prod-div">
              <svg
                class="prod-delete-button"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.488464 0.508303C0.800696 0.196165 1.22412 0.0208154 1.66561 0.0208154C2.10711 0.0208154 2.53053 0.196165 2.84276 0.508303L9.99057 7.65611L17.1384 0.508303C17.292 0.349279 17.4757 0.222436 17.6788 0.135175C17.882 0.0479149 18.1004 0.00198396 18.3215 6.28652e-05C18.5426 -0.00185823 18.7618 0.0402685 18.9665 0.123986C19.1711 0.207703 19.357 0.331334 19.5133 0.487664C19.6696 0.643995 19.7933 0.829895 19.877 1.03452C19.9607 1.23914 20.0028 1.45838 20.0009 1.67946C19.999 1.90054 19.9531 2.11902 19.8658 2.32215C19.7785 2.52529 19.6517 2.70901 19.4927 2.8626L12.3449 10.0104L19.4927 17.1582C19.796 17.4722 19.9638 17.8928 19.96 18.3294C19.9562 18.7659 19.7811 19.1835 19.4724 19.4922C19.1637 19.8009 18.7461 19.976 18.3095 19.9798C17.873 19.9836 17.4524 19.8158 17.1384 19.5125L9.99057 12.3647L2.84276 19.5125C2.52874 19.8158 2.10816 19.9836 1.6716 19.9798C1.23505 19.976 0.817448 19.8009 0.508745 19.4922C0.200043 19.1835 0.0249367 18.7659 0.0211432 18.3294C0.0173496 17.8928 0.185172 17.4722 0.488464 17.1582L7.63627 10.0104L0.488464 2.8626C0.176326 2.55037 0.000976562 2.12695 0.000976562 1.68545C0.000976562 1.24396 0.176326 0.820534 0.488464 0.508303Z"
                  fill="#808080"
                />
              </svg>
              <div class="shop-prod-inner-div">
                <h1>상품명1</h1>
                <div class="shop-prod-inner-info">
                  <img class="info-img" src="@/assets/images/prod-img.png" alt="" />
                  <div class="info-first-col">
                    <div class="info-first-col-first-row">
                      <div class="button1">옵션</div>
                      옵션명
                    </div>
                    <div class="info-first-col-first-row">
                      <div class="button1">수량</div>
                      수량
                    </div>
                    <div class="button2"><span>옵션/수량 변경</span></div>
                  </div>
                  <div class="info-second-col">
                    <span>상품금액</span>
                    <span>할인금액</span>
                    <span>할인적용금액</span>
                  </div>
                  <div class="info-third-col">
                    <span>상품금액</span>
                    <span><div class="highlight1">할인금액</div></span>
                    <span> <div class="highlight2">할인적용금액</div></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="shop-prod-div">
              <svg
                class="prod-delete-button"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.488464 0.508303C0.800696 0.196165 1.22412 0.0208154 1.66561 0.0208154C2.10711 0.0208154 2.53053 0.196165 2.84276 0.508303L9.99057 7.65611L17.1384 0.508303C17.292 0.349279 17.4757 0.222436 17.6788 0.135175C17.882 0.0479149 18.1004 0.00198396 18.3215 6.28652e-05C18.5426 -0.00185823 18.7618 0.0402685 18.9665 0.123986C19.1711 0.207703 19.357 0.331334 19.5133 0.487664C19.6696 0.643995 19.7933 0.829895 19.877 1.03452C19.9607 1.23914 20.0028 1.45838 20.0009 1.67946C19.999 1.90054 19.9531 2.11902 19.8658 2.32215C19.7785 2.52529 19.6517 2.70901 19.4927 2.8626L12.3449 10.0104L19.4927 17.1582C19.796 17.4722 19.9638 17.8928 19.96 18.3294C19.9562 18.7659 19.7811 19.1835 19.4724 19.4922C19.1637 19.8009 18.7461 19.976 18.3095 19.9798C17.873 19.9836 17.4524 19.8158 17.1384 19.5125L9.99057 12.3647L2.84276 19.5125C2.52874 19.8158 2.10816 19.9836 1.6716 19.9798C1.23505 19.976 0.817448 19.8009 0.508745 19.4922C0.200043 19.1835 0.0249367 18.7659 0.0211432 18.3294C0.0173496 17.8928 0.185172 17.4722 0.488464 17.1582L7.63627 10.0104L0.488464 2.8626C0.176326 2.55037 0.000976562 2.12695 0.000976562 1.68545C0.000976562 1.24396 0.176326 0.820534 0.488464 0.508303Z"
                  fill="#808080"
                />
              </svg>
              <div class="shop-prod-inner-div">
                <h1>상품명1</h1>
                <div class="shop-prod-inner-info">
                  <img class="info-img" src="@/assets/images/prod-img.png" alt="" />
                  <div class="info-first-col">
                    <div class="info-first-col-first-row">
                      <div class="button1">옵션</div>
                      옵션명
                    </div>
                    <div class="info-first-col-first-row">
                      <div class="button1">수량</div>
                      수량
                    </div>
                    <div class="button2"><span>옵션/수량 변경</span>></div>
                  </div>
                  <div class="info-second-col">
                    <span>상품금액</span>
                    <span>할인금액</span>
                    <span>할인적용금액</span>
                  </div>
                  <div class="info-third-col">
                    <span>상품금액</span>
                    <span><div class="highlight1">할인금액</div></span>
                    <span> <div class="highlight2">할인적용금액</div></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="user-container">
          <div class="user-first-row">
            <div class="container-title">주문자</div>
            <div class="black-button"><span>주문자 정보와 동일</span></div>
          </div>
          <div class="line"></div>
          <div class="user-info-wrapper">
            <div class="user-info-first-col">
              <span>성함</span>
              <span>휴대폰</span>
              <span>연락처(선택)</span>
              <span>이메일</span>
            </div>
            <div class="user-info-second-col">
              <input type="text" placeholder="성함" />
              <input type="text" placeholder="휴대폰" />
              <input type="text" placeholder="연락처(선택)" />
              <input type="text" placeholder="이메일" />
            </div>
          </div>
        </div>
        <div class="place-container">
          <div class="place-first-row">
            <div class="container-title">배송지</div>
            <div class="place-button-wrapper">
              <div class="black-button"><span>주문자 정보와 동일</span></div>
              <div class="black-button"><span>배송지 목록 조회</span></div>
            </div>
          </div>
          <div class="line"></div>
          <div class="user-info-wrapper">
            <div class="user-info-first-col">
              <span>받는 분성함</span>
              <span>받는분 주소</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span>받는분 휴대폰</span>
            </div>
            <div class="user-info-second-col">
              <input type="text" placeholder="성함" />
              <input type="text" placeholder="우편번호" />
              <input type="text" placeholder="주소" />
              <input type="text" placeholder="상세주소" />
              <input type="text" placeholder="휴대폰" />
            </div>
            <div class="place-third-col">
              <span>&nbsp;</span>
              <div class="black-button"><span>검색</span></div>
            </div>
          </div>
        </div>
        <div class="requirements-container">
          <div class="container-title">요청사항</div>
          <div class="line"></div>
          <input type="text" />
        </div>
        <div class="discount-container">
          <div class="container-title">할인</div>
          <div class="line"></div>
          <div class="discount-info-container">
            <div class="discount-container-first-col">
              <span>할인쿠폰</span>
              <span>포인트</span>
            </div>
            <div class="discount-container-second-col">
              <div class="discount-container-row">
                N원
                <div class="white-button">쿠폰사용</div>
                <span>(보유 N장)</span>
              </div>
              <div class="discount-container-row">
                <div class="blank-box"></div>
                원
                <div class="white-button">전체 사용</div>
                <span>(보유 포인트:N원)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-right-container">
        <div class="pay-total-container">
          <div class="container-title">결제 금액</div>
          <div class="line"></div>
          <div class="pay-first-block">
            <div class="pay-inner-first-block">
              <div class="pay-first-col">
                <span>총 주문금액</span>
                <span>총 배송비</span>
                <span>쿠폰 할인</span>
                <span>포인트</span>
              </div>
              <div class="pay-second-col">
                <span>총 상품금액</span>
                <span>총 배송비</span>
                <span>-총 할인</span>
                <span>-포인트 사용금액</span>
              </div>
            </div>
            <div class="inner-line"></div>
            <div class="pay-inner-second-block">
              <span>총 결제금액</span>
              <span>총 결제금액</span>
            </div>
          </div>
          <div class="pay-first-block">
            <div class="pay-inner-first-block">
              <div class="pay-first-col">
                <span>포인트 혜택</span>
              </div>
              <div class="pay-second-col2">
                <h1>최대 N원</h1>
              </div>
            </div>
            <div class="inner-line"></div>
            <div class="pay-inner-first-block">
              <div class="pay-first-col">
                <span>구매 적립</span>
                <span>멤버십 추가적립</span>
                <span>리뷰 적립</span>
              </div>
              <div class="pay-second-col">
                <span>N원</span>
                <span>N원</span>
                <span>최대 N원</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pay-method-container">
          <div class="pay-method-first-row">
            <div class="container-title">결제 수단</div>
            <span>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</span>
          </div>
          <div class="line"></div>
          <div class="kakao-pay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="42"
              viewBox="0 0 47 42"
              fill="none"
            >
              <path
                d="M23.5 39.3804C36.4779 39.3804 47 30.5648 47 19.6902C47 8.81559 36.4779 0 23.5 0C10.5221 0 0 8.81559 0 19.6902C0 24.6409 2.18256 29.1696 5.78688 32.6295C5.50194 35.4874 4.56194 38.6209 3.52206 40.9725C3.29 41.4957 3.73944 42.0808 4.324 41.9908C10.951 40.95 14.8902 39.3523 16.6028 38.5197C18.8526 39.0943 21.1715 39.3837 23.5 39.3804Z"
                fill="#181600"
              />
            </svg>
            <span>카카오페이</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="42"
              viewBox="0 0 47 42"
              fill="none"
            >
              <path
                d="M23.5 39.3804C36.4779 39.3804 47 30.5648 47 19.6902C47 8.81559 36.4779 0 23.5 0C10.5221 0 0 8.81559 0 19.6902C0 24.6409 2.18256 29.1696 5.78688 32.6295C5.50194 35.4874 4.56194 38.6209 3.52206 40.9725C3.29 41.4957 3.73944 42.0808 4.324 41.9908C10.951 40.95 14.8902 39.3523 16.6028 38.5197C18.8526 39.0943 21.1715 39.3837 23.5 39.3804Z"
                fill="#fee500"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/order/order.css';
</style>
