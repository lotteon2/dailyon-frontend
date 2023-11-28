<script setup lang='ts'>

</script>

<template>
  <div class='order-check-container'>
    <div class='container-title'>주문/배송 조회</div>
    <div class='container-line'></div>
    <div class='inner-title-container'>
      <div class='container-inner-title'>주문 상태</div>
      <div class='container-inner-title2'>
        (최근 한 달 기준)
      </div>
    </div>
    <div class='process-container'>
      <div class='process-column'>
        <h1>0</h1>
        <h2>입금 확인 중</h2>
        <h3>
          입금 확인이 되지 않은 상태입니다. <br />안내된
          시간 이내 미입금 시 <br />주문이 자동
          취소됩니다.
        </h3>
        <h4>- 주문취소 가능</h4>
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='17'
        height='30'
        viewBox='0 0 17 30'
        fill='none'
      >
        <path
          d='M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z'
          fill='#C6C6C6'
        />
      </svg>
      <div class='process-column'>
        <h1>0</h1>
        <h2>배송 준비중</h2>
        <h3>
          물류센터에서 <br />주문하신 상품을 준비
          중입니다.
        </h3>
        <h4>- 배송지 변경, 주문취소 가능</h4>
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='17'
        height='30'
        viewBox='0 0 17 30'
        fill='none'
      >
        <path
          d='M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z'
          fill='#C6C6C6'
        />
      </svg>
      <div class='process-column'>
        <h1>0</h1>
        <h2>배송중</h2>
        <h3>
          택배사에 상품이 접수되어 <br />고객님께 배송
          중입니다. 취소됩니다.
        </h3>
        <h4>- 주문취소 불가</h4>
        <h4>- 운송장번호 조회 가능</h4>
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='17'
        height='30'
        viewBox='0 0 17 30'
        fill='none'
      >
        <path
          d='M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z'
          fill='#C6C6C6'
        />
      </svg>
      <div class='process-column'>
        <h1>0</h1>
        <h2>배송 완료</h2>
        <h3>상품이 고객님께 전달 완료되었습니다.</h3>
        <h4>- 교환/환불/AS 신청 가능</h4>
      </div>
    </div>
    <div class='container-inner-line'></div>
    <div class='inner-title-container'>
      <div class='container-inner-title'>
        주문 내역&nbsp;&nbsp;
      </div>
      <div class='container-inner-title3'>
        3개월간 주문내역입니다. 지난 주문내역을 더 보시려면
        하단 연도별 조회 기능을 이용해주세요.
      </div>
    </div>
    <div class='hide-cancel-button'>취소 주문 숨기기</div>
    <div class='search-container'>
      <span>연도별 검색</span>
      <select name='' id=''>
        <option value='default'>연도별 검색</option>
        <option value='2023'>2023</option>
        <option value='2022'>2022</option>
        <option value='2021'>2021</option>
        <option value='2020'>2020</option>
      </select>
      <div class='black-button'>초기화</div>
      <span>브랜드/상품 검색</span>
      <select name='' id=''>
        <option value='default'>브랜드/상품</option>
        <option value='브랜드/상품'>브랜드/상품</option>
        <option value='브랜드/상품'>브랜드/상품</option>
        <option value='브랜드/상품'>브랜드/상품</option>
        <option value='브랜드/상품'>브랜드/상품</option>
      </select>
      <input
        type='text'
        placeholder='검색어를 입력해주세요'
      />
      <div class='search-button'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='15'
          height='15'
          viewBox='0 0 15 15'
          fill='none'
        >
          <path
            d='M14.3536 15.0018L8.62022 9.26845C8.16242 9.65849 7.63596 9.96032 7.04084 10.174C6.44571 10.3876 5.84753 10.4944 5.24629 10.4944C3.78014 10.4944 2.53922 9.98688 1.52353 8.9718C0.507844 7.95611 0 6.7155 0 5.24995C0 3.78441 0.507233 2.54318 1.5217 1.52628C2.53678 0.508759 3.77709 0 5.24263 0C6.70878 0 7.95031 0.507844 8.96722 1.52353C9.98413 2.53922 10.4926 3.78044 10.4926 5.24721C10.4926 5.88323 10.38 6.49881 10.1547 7.09394C9.92889 7.68907 9.63285 8.19813 9.26662 8.62113L15 14.3536L14.3527 15.0018H14.3536ZM5.24629 9.57792C6.46097 9.57792 7.48672 9.1598 8.32357 8.32357C9.1598 7.48733 9.57792 6.46158 9.57792 5.24629C9.57792 4.03162 9.1598 3.00616 8.32357 2.16993C7.48733 1.3337 6.46188 0.915583 5.24721 0.915583C4.03253 0.915583 3.00678 1.3337 2.16993 2.16993C1.3337 3.00616 0.915583 4.03162 0.915583 5.24629C0.915583 6.46097 1.3337 7.48642 2.16993 8.32265C3.00617 9.15888 4.03162 9.57792 5.24629 9.57792Z'
            fill='white'
          />
        </svg>
      </div>
    </div>
    <table>
      <col width='200px' />
      <col width='200px' />
      <col width='500px' />
      <col width='300px' />
      <col width='300px' />
      <col width='200px' />
      <tr class='table-header'>
        <th>주문번호</th>
        <th>브랜드</th>
        <th>상품명</th>
        <th>결제금액</th>
        <th>주문상태</th>
        <th>결제일시</th>
      </tr>
      <tr class='table-inner-header'>
        <th>주문번호</th>
        <th>브랜드</th>
        <th>상품 A 외 N건</th>
        <th>결제금액</th>
        <th>주문상태</th>
        <th>결제일시</th>
      </tr>
      <tr class='table-data'>
        <td>주문번호</td>
        <td>브랜드</td>
        <td>상품명</td>
        <td>결제금액</td>
        <td>주문상태</td>
        <td>결제일시</td>
      </tr>
      <tr class='table-data'>
        <td>주문번호</td>
        <td>브랜드</td>
        <td>상품명</td>
        <td>결제금액</td>
        <td>주문상태</td>
        <td>결제일시</td>
      </tr>
    </table>
    <div class='button-container'>
      <div class='button-row'>
        <div class='grey-button2'>주문 취소</div>
      </div>
      <div class='button-row'>
        <div class='black-button'>배송지 변경</div>
        <div class='grey-button2'>주문 취소</div>
      </div>
      <div class='button-row'>
        <div class='black-button'>운송장번호 조회</div>
      </div>
      <div class='button-row'>
        <div class='black-button'>리뷰 작성</div>
        <div class='grey-button3'>A/S 신청</div>
        <div class='grey-button2'>교환 신청</div>
        <div class='grey-button1'>환불 신청</div>
      </div>
      <div class='container-inner-line'></div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/order-history.css";
</style>