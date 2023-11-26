<script setup lang='ts'>

</script>

<template>
  <div class="main-container">
    <div class="left-container">
      <div class="left-black-box">마이페이지</div>
      <div class="left-inner-container">
        <h1>나의 구매</h1>
        <h2>주문/배송 조회</h2>
        <h2>교환/환불 신청</h2>
        <h2>AS 신청</h2>
        <div class="left-inner-line"></div>
        <h1>나의 혜택</h1>
        <h2>포인트 조회</h2>
        <h2>포인트 사용 내역</h2>
        <h2>쿠폰 관리</h2>
        <h2>이벤트 관리</h2>
        <div class="left-inner-line"></div>
        <h1>나의 관심상품</h1>
        <h2>장바구니</h2>
        <h2>찜한 상품</h2>
        <h2>찜한 브랜드</h2>
        <div class="left-inner-line"></div>
        <h1>나의 정보</h1>
        <h2>회원정보 수정</h2>
        <h2>리뷰 관리</h2>
        <h2>문의 내역</h2>
        <h2>회원 탈퇴</h2>
        <div class="left-inner-line"></div>
        <h1>나의 OOTD</h1>
        <h2>필로잉/팔로워 관리</h2>
        <h2>게시글 관리</h2>
        <h2>관심 게시글</h2>
      </div>
    </div>
    <div class="right-container">
      <div class="user-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
        >
          <circle cx="75" cy="75" r="75" fill="#D9D9D9" />
        </svg>
        <div class="user-name-container">
          <div class="user-name-container-first-line">
            <h1>
              닉네임&nbsp;
              <h2>님, 반갑습니다!</h2>
            </h1>
          </div>
          <h3>이메일 주소</h3>
        </div>
        <div class="user-container-point-container">
          포인트
          <h1>0</h1>
          점
        </div>
        <div class="modify-button">정보 수정</div>
        <div class="logout-button">로그아웃</div>
      </div>
      <div class="order-check-container">
        <div class="container-title">주문/배송 조회</div>
        <div class="container-line"></div>
        <div class="inner-title-container">
          <div class="container-inner-title">주문 상태</div>
          <div class="container-inner-title2">
            (최근 한 달 기준)
          </div>
        </div>
        <div class="process-container">
          <div class="process-column">
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
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="30"
            viewBox="0 0 17 30"
            fill="none"
          >
            <path
              d="M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z"
              fill="#C6C6C6"
            />
          </svg>
          <div class="process-column">
            <h1>0</h1>
            <h2>배송 준비중</h2>
            <h3>
              물류센터에서 <br />주문하신 상품을 준비
              중입니다.
            </h3>
            <h4>- 배송지 변경, 주문취소 가능</h4>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="30"
            viewBox="0 0 17 30"
            fill="none"
          >
            <path
              d="M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z"
              fill="#C6C6C6"
            />
          </svg>
          <div class="process-column">
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
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="30"
            viewBox="0 0 17 30"
            fill="none"
          >
            <path
              d="M1.4985 29.9999C1.30197 30.0023 1.10711 29.9635 0.926456 29.8861C0.745803 29.8087 0.583352 29.6943 0.449549 29.5503C-0.14985 28.951 -0.14985 28.0219 0.449549 27.4225L12.8871 14.985L0.449549 2.57741C-0.14985 1.97801 -0.14985 1.04895 0.449549 0.449549C1.04895 -0.14985 1.97802 -0.14985 2.57741 0.449549L16.0339 13.966C16.6333 14.5654 16.6333 15.4944 16.0339 16.0938L2.54744 29.5503C2.24774 29.85 1.85814 29.9999 1.4985 29.9999Z"
              fill="#C6C6C6"
            />
          </svg>
          <div class="process-column">
            <h1>0</h1>
            <h2>배송 완료</h2>
            <h3>상품이 고객님께 전달 완료되었습니다.</h3>
            <h4>- 교환/환불/AS 신청 가능</h4>
          </div>
        </div>
        <div class="container-inner-line"></div>
        <div class="inner-title-container">
          <div class="container-inner-title">
            주문 내역&nbsp;&nbsp;
          </div>
          <div class="container-inner-title3">
            3개월간 주문내역입니다. 지난 주문내역을 더 보시려면
            하단 연도별 조회 기능을 이용해주세요.
          </div>
        </div>
        <div class="hide-cancel-button">취소 주문 숨기기</div>
        <div class="search-container">
          <span>연도별 검색</span>
          <select name="" id="">
            <option value="default">연도별 검색</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
          <div class="black-button">초기화</div>
          <span>브랜드/상품 검색</span>
          <select name="" id="">
            <option value="default">브랜드/상품</option>
            <option value="브랜드/상품">브랜드/상품</option>
            <option value="브랜드/상품">브랜드/상품</option>
            <option value="브랜드/상품">브랜드/상품</option>
            <option value="브랜드/상품">브랜드/상품</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
          />
          <div class="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M14.3536 15.0018L8.62022 9.26845C8.16242 9.65849 7.63596 9.96032 7.04084 10.174C6.44571 10.3876 5.84753 10.4944 5.24629 10.4944C3.78014 10.4944 2.53922 9.98688 1.52353 8.9718C0.507844 7.95611 0 6.7155 0 5.24995C0 3.78441 0.507233 2.54318 1.5217 1.52628C2.53678 0.508759 3.77709 0 5.24263 0C6.70878 0 7.95031 0.507844 8.96722 1.52353C9.98413 2.53922 10.4926 3.78044 10.4926 5.24721C10.4926 5.88323 10.38 6.49881 10.1547 7.09394C9.92889 7.68907 9.63285 8.19813 9.26662 8.62113L15 14.3536L14.3527 15.0018H14.3536ZM5.24629 9.57792C6.46097 9.57792 7.48672 9.1598 8.32357 8.32357C9.1598 7.48733 9.57792 6.46158 9.57792 5.24629C9.57792 4.03162 9.1598 3.00616 8.32357 2.16993C7.48733 1.3337 6.46188 0.915583 5.24721 0.915583C4.03253 0.915583 3.00678 1.3337 2.16993 2.16993C1.3337 3.00616 0.915583 4.03162 0.915583 5.24629C0.915583 6.46097 1.3337 7.48642 2.16993 8.32265C3.00617 9.15888 4.03162 9.57792 5.24629 9.57792Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <table>
          <col width="200px" />
          <col width="200px" />
          <col width="500px" />
          <col width="300px" />
          <col width="300px" />
          <col width="200px" />
          <tr class="table-header">
            <th>주문번호</th>
            <th>브랜드</th>
            <th>상품명</th>
            <th>결제금액</th>
            <th>주문상태</th>
            <th>결제일시</th>
          </tr>
          <tr class="table-inner-header">
            <th>주문번호</th>
            <th>브랜드</th>
            <th>상품 A 외 N건</th>
            <th>결제금액</th>
            <th>주문상태</th>
            <th>결제일시</th>
          </tr>
          <tr class="table-data">
            <td>주문번호</td>
            <td>브랜드</td>
            <td>상품명</td>
            <td>결제금액</td>
            <td>주문상태</td>
            <td>결제일시</td>
          </tr>
          <tr class="table-data">
            <td>주문번호</td>
            <td>브랜드</td>
            <td>상품명</td>
            <td>결제금액</td>
            <td>주문상태</td>
            <td>결제일시</td>
          </tr>
        </table>
        <div class="button-container">
          <div class="button-row">
            <div class="grey-button2">주문 취소</div>
          </div>
          <div class="button-row">
            <div class="black-button">배송지 변경</div>
            <div class="grey-button2">주문 취소</div>
          </div>
          <div class="button-row">
            <div class="black-button">운송장번호 조회</div>
          </div>
          <div class="button-row">
            <div class="black-button">리뷰 작성</div>
            <div class="grey-button3">A/S 신청</div>
            <div class="grey-button2">교환 신청</div>
            <div class="grey-button1">환불 신청</div>
          </div>
          <div class="container-inner-line"></div>
        </div>
      </div>
      <div class="change-container">
        <div class="container-title">교환/환불 신청</div>
        <div class="container-line"></div>
        <div class="inner-title-container">
          <div class="container-inner-title">
            교환/환불 신청 내역&nbsp;&nbsp;
          </div>
          <div class="container-inner-title3">
            3개월간 주문내역입니다. 지난 주문내역을 더 보시려면
            하단 연도별 조회 기능을 이용해주세요.
          </div>
        </div>
        <div class="hide-cancel-button">취소 주문 숨기기</div>
        <div class="search-container">
          <span>연도별 검색</span>
          <select name="" id="">
            <option value="default">연도별 검색</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
          <div class="black-button">초기화</div>
          <span>브랜드/상품 검색</span>
          <select name="" id="">
            <option value="default">브랜드/상품</option>
            <option value="브랜드/상품">브랜드/상품</option>
            <option value="브랜드/상품">브랜드/상품</option>
            <option value="브랜드/상품">브랜드/상품</option>
            <option value="브랜드/상품">브랜드/상품</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
          />
          <div class="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M14.3536 15.0018L8.62022 9.26845C8.16242 9.65849 7.63596 9.96032 7.04084 10.174C6.44571 10.3876 5.84753 10.4944 5.24629 10.4944C3.78014 10.4944 2.53922 9.98688 1.52353 8.9718C0.507844 7.95611 0 6.7155 0 5.24995C0 3.78441 0.507233 2.54318 1.5217 1.52628C2.53678 0.508759 3.77709 0 5.24263 0C6.70878 0 7.95031 0.507844 8.96722 1.52353C9.98413 2.53922 10.4926 3.78044 10.4926 5.24721C10.4926 5.88323 10.38 6.49881 10.1547 7.09394C9.92889 7.68907 9.63285 8.19813 9.26662 8.62113L15 14.3536L14.3527 15.0018H14.3536ZM5.24629 9.57792C6.46097 9.57792 7.48672 9.1598 8.32357 8.32357C9.1598 7.48733 9.57792 6.46158 9.57792 5.24629C9.57792 4.03162 9.1598 3.00616 8.32357 2.16993C7.48733 1.3337 6.46188 0.915583 5.24721 0.915583C4.03253 0.915583 3.00678 1.3337 2.16993 2.16993C1.3337 3.00616 0.915583 4.03162 0.915583 5.24629C0.915583 6.46097 1.3337 7.48642 2.16993 8.32265C3.00617 9.15888 4.03162 9.57792 5.24629 9.57792Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <table>
          <col width="200px" />
          <col width="200px" />
          <col width="500px" />
          <col width="300px" />
          <col width="300px" />
          <col width="200px" />
          <tr class="table-header">
            <th>주문번호</th>
            <th>브랜드</th>
            <th>상품명</th>
            <th>결제금액</th>
            <th>주문상태</th>
            <th>결제일시</th>
          </tr>
          <tr class="table-inner-header">
            <th>주문번호</th>
            <th>브랜드</th>
            <th>상품 A 외 N건</th>
            <th>결제금액</th>
            <th>주문상태</th>
            <th>결제일시</th>
          </tr>
          <tr class="table-data">
            <td>주문번호</td>
            <td>브랜드</td>
            <td>상품명</td>
            <td>결제금액</td>
            <td>주문상태</td>
            <td>결제일시</td>
          </tr>
          <tr class="table-data">
            <td>주문번호</td>
            <td>브랜드</td>
            <td>상품명</td>
            <td>결제금액</td>
            <td>주문상태</td>
            <td>결제일시</td>
          </tr>
        </table>
        <div class="button-container">
          <div class="button-row">
            <div class="grey-button2">주문 취소</div>
          </div>
          <div class="button-row">
            <div class="black-button">배송지 변경</div>
            <div class="grey-button2">주문 취소</div>
          </div>
          <div class="button-row">
            <div class="black-button">운송장번호 조회</div>
          </div>
          <div class="button-row">
            <div class="black-button">리뷰 작성</div>
            <div class="grey-button3">A/S 신청</div>
            <div class="grey-button2">교환 신청</div>
            <div class="grey-button1">환불 신청</div>
          </div>
          <div class="container-inner-line"></div>
        </div>
      </div>
      <div class="point-container">
        <div class="container-title">포인트 사용 내역</div>
        <div class="container-line"></div>
        <table>
          <col width="400px" />
          <col width="150px" />
          <col width="150px" />
          <col width="150px" />
          <col width="100px" />
          <tr class="point-table-data1">
            <td class="left-margin">상품명</td>
            <td>결제금액</td>
            <td>사용금액</td>
            <td>사용일시</td>
            <td>총 적립금</td>
          </tr>
          <tr class="point-table-data1">
            <td class="left-margin">상품명</td>
            <td>결제금액</td>
            <td>사용금액</td>
            <td>사용일시</td>
            <td>총 적립금</td>
          </tr>
          <tr class="point-table-data2">
            <td class="left-margin">상품명</td>
            <td>결제금액</td>
            <td>사용금액</td>
            <td>사용일시</td>
            <td>총 적립금</td>
          </tr>
          <tr class="point-table-data2">
            <td class="left-margin">상품명</td>
            <td>결제금액</td>
            <td>사용금액</td>
            <td>사용일시</td>
            <td>총 적립금</td>
          </tr>
        </table>
      </div>
      <div class="coupon-container">
        <div class="container-title">쿠폰 관리</div>
        <div class="container-line"></div>
        <table>
          <col width="300px" />
          <col width="200px" />
          <col width="200px" />
          <col width="200px" />
          <col width="100px" />
          <tr class="point-table-data1">
            <td class="left-margin">쿠폰명</td>
            <td>사용처</td>
            <td>할인금액</td>
            <td>사용조건</td>
            <td>유효기간</td>
          </tr>
          <tr class="point-table-data1">
            <td class="left-margin">쿠폰명</td>
            <td>사용처</td>
            <td>할인금액</td>
            <td>사용조건</td>
            <td>유효기간</td>
          </tr>
          <tr class="point-table-data2">
            <td class="left-margin">쿠폰명</td>
            <td>사용처</td>
            <td>할인금액</td>
            <td>사용조건</td>
            <td>유효기간</td>
          </tr>
          <tr class="point-table-data2">
            <td class="left-margin">쿠폰명</td>
            <td>사용처</td>
            <td>할인금액</td>
            <td>사용조건</td>
            <td>유효기간</td>
          </tr>
        </table>
      </div>
      <div class="event-container">
        <div class="container-title">이벤트 관리</div>
        <div class="container-line"></div>
        <table>
          <col width="200px" />
          <col width="400px" />
          <col width="100px" />
          <col width="100px" />
          <col width="70px" />
          <tr class="point-table-data1">
            <td class="left-margin">이벤트명</td>
            <td class="left-align">이벤트 내용</td>
            <td>신청 일시</td>
            <td>당첨 여부</td>
            <td>
              <div class="use-button-disable">사용하기</div>
            </td>
          </tr>
          <tr class="point-table-data1">
            <td class="left-margin">이벤트명</td>
            <td class="left-align">이벤트 내용</td>
            <td>신청 일시</td>
            <td>당첨 여부</td>
            <td><div class="use-button">사용하기</div></td>
          </tr>
          <tr class="point-table-data2">
            <td class="left-margin">이벤트명</td>
            <td class="left-align">이벤트 내용</td>
            <td>신청 일시</td>
            <td>당첨 여부</td>
            <td><div class="use-button">사용하기</div></td>
          </tr>
          <tr class="point-table-data2">
            <td class="left-margin">이벤트명</td>
            <td class="left-align">이벤트 내용</td>
            <td>신청 일시</td>
            <td>당첨 여부</td>
            <td>
              <div class="use-button-disable">사용하기</div>
            </td>
          </tr>
        </table>
      </div>
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
          <tr class="point-table-data1">
            <td class="left-margin">선택</td>
            <td class="left-align"></td>
            <td class="left-align">상품명</td>
            <td class="center-text">수량</td>
            <td class="center-text">상품 가격</td>
            <td>총금액</td>
          </tr>
          <tr class="point-table-data1">
            <td class="left-margin">
              <input
                class="basket-checkbox"
                type="checkbox"
              />
            </td>
            <td class="left-align">
              <img
                class="basket-img"
                src="/src/prod-img.png"
                alt=""
              />
            </td>
            <td class="left-align">
              <div class="basket-column">
                <h1>상품명</h1>
                <h2>상품 옵션</h2>
                <h3>옵션 변경</h3>
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
                src="/src/prod-img.png"
                alt=""
              />
            </td>
            <td class="left-align">
              <div class="basket-column">
                <h1>상품명</h1>
                <h2>상품 옵션</h2>
                <h3>옵션 변경</h3>
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
      <div class="jjim-prod-container">
        <div class="container-title">찜한 상품</div>
        <div class="basket-top-button-container">
          <div class="top-button">전체 선택</div>
          <div class="top-button">선택 삭제</div>
          <div class="top-button">전체 삭제</div>
        </div>
        <div class="container-line"></div>
        <table>
          <col width="80px" />
          <col width="150px" />
          <col width="350px" />
          <col width="400px" />
          <tr class="point-table-data1">
            <td class="left-margin">선택</td>
            <td class="left-align"></td>
            <td class="left-align">상품명</td>
            <td class="center-text">판매 가격</td>
          </tr>
          <tr class="point-table-data2">
            <td class="left-margin">
              <input
                class="basket-checkbox"
                type="checkbox"
              />
            </td>
            <td class="left-align">
              <img
                class="basket-img"
                src="/src/prod-img.png"
                alt=""
              />
            </td>
            <td class="left-align">
              <div class="basket-column">
                <h1>상품명</h1>
              </div>
            </td>

            <td class="center-text">
              <span class="prod-price">판매 가격</span>
            </td>
          </tr>
          <tr class="point-table-data2">
            <td class="left-margin">
              <input
                class="basket-checkbox"
                type="checkbox"
              />
            </td>
            <td class="left-align">
              <img
                class="basket-img"
                src="/src/prod-img.png"
                alt=""
              />
            </td>
            <td class="left-align">
              <div class="basket-column">
                <h1>상품명</h1>
              </div>
            </td>

            <td class="center-text">
              <span class="prod-price">판매 가격</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="user-info-container">
        <div class="container-title">회원정보 수정</div>
        <div class="container-line"></div>
        <div class="user-info-first-row">
          <div class="container-inner-title">기본 정보</div>
          <div class="modify-button-wrapper">
            <div class="modify-white">초기화</div>
            <div class="modify-white modify-black">
              수정 완료
            </div>
          </div>
        </div>
        <div class="user-info-second-row">
          <div class="user-info-second-row-first-col">
            <svg
              class="profile-circle"
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              viewBox="0 0 150 150"
              fill="none"
            >
              <circle cx="75" cy="75" r="75" fill="#D9D9D9" />
            </svg>
            <div class="profile-change-button">프로필 변경</div>
          </div>
          <div class="user-info-second-row-second-col">
            <span>이메일</span>
            <span>닉네임</span>
            <span>기본 배송지</span>
          </div>
          <div class="user-info-second-row-third-col">
            <span>이메일</span>
            <span class="info-underline">닉네임</span>
            <span class="info-underline">기본 주소</span>
          </div>
          <div class="user-info-second-row-fourth-col">
            <div class="place-choice-button">배송지 선택</div>
          </div>
        </div>
        <div class="container-inner-title">배송지 관리</div>
        <div class="place-add-button">추가</div>
        <table>
          <col width="80px" />
          <col width="100px" />
          <col width="150px" />
          <col width="400px" />
          <col width="80px" />
          <tr class="place-font point-table-data1">
            <td class="padding-left-10">선택</td>
            <td>배송지명</td>
            <td>이름</td>
            <td>배송지 주소</td>
            <td class="text-align-right">
              <div class="place-choice-button-wrapper">
                <div class="place-white-button">
                  전체 선택
                </div>
                <div class="place-white-button">
                  선택 삭제
                </div>
                <div class="place-white-button">
                  전체 삭제
                </div>
              </div>
            </td>
          </tr>
          <tr class="place-font point-table-data1">
            <td class="padding-left-10">
              <input
                class="basket-checkbox"
                type="checkbox"
              />
            </td>
            <td>배송지명</td>
            <td>이름</td>
            <td>배송지 주소</td>
            <td>
              <div class="close-button-div">
                <svg
                  class="margin-right-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M19.2798 17.2911C19.544 17.5553 19.6924 17.9136 19.6924 18.2872C19.6924 18.6608 19.544 19.0191 19.2798 19.2833C19.0156 19.5475 18.6573 19.6959 18.2837 19.6959C17.9101 19.6959 17.5518 19.5475 17.2876 19.2833L9.84736 11.8407L2.40478 19.281C2.1406 19.5451 1.7823 19.6936 1.40869 19.6936C1.03508 19.6936 0.676776 19.5451 0.412596 19.281C0.148415 19.0168 3.9366e-09 18.6585 0 18.2849C-3.9366e-09 17.9113 0.148415 17.5529 0.412596 17.2888L7.85517 9.84853L0.414939 2.40595C0.150759 2.14177 0.0023438 1.78347 0.0023438 1.40986C0.00234381 1.03625 0.150759 0.677948 0.414939 0.413767C0.67912 0.149587 1.03743 0.00117168 1.41103 0.00117168C1.78464 0.00117167 2.14295 0.149587 2.40713 0.413767L9.84736 7.85635L17.2899 0.412595C17.5541 0.148415 17.9124 -6.22431e-09 18.286 0C18.6596 6.22431e-09 19.0179 0.148415 19.2821 0.412595C19.5463 0.676776 19.6947 1.03508 19.6947 1.40869C19.6947 1.7823 19.5463 2.1406 19.2821 2.40478L11.8395 9.84853L19.2798 17.2911Z"
                    fill="black"
                  />
                </svg>
              </div>
            </td>
          </tr>
          <tr class="place-font point-table-data2">
            <td class="padding-left-10">
              <input
                class="basket-checkbox"
                type="checkbox"
              />
            </td>
            <td>배송지명</td>
            <td>이름</td>
            <td>배송지 주소</td>
            <td>
              <div class="close-button-div">
                <svg
                  class="margin-right-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M19.2798 17.2911C19.544 17.5553 19.6924 17.9136 19.6924 18.2872C19.6924 18.6608 19.544 19.0191 19.2798 19.2833C19.0156 19.5475 18.6573 19.6959 18.2837 19.6959C17.9101 19.6959 17.5518 19.5475 17.2876 19.2833L9.84736 11.8407L2.40478 19.281C2.1406 19.5451 1.7823 19.6936 1.40869 19.6936C1.03508 19.6936 0.676776 19.5451 0.412596 19.281C0.148415 19.0168 3.9366e-09 18.6585 0 18.2849C-3.9366e-09 17.9113 0.148415 17.5529 0.412596 17.2888L7.85517 9.84853L0.414939 2.40595C0.150759 2.14177 0.0023438 1.78347 0.0023438 1.40986C0.00234381 1.03625 0.150759 0.677948 0.414939 0.413767C0.67912 0.149587 1.03743 0.00117168 1.41103 0.00117168C1.78464 0.00117167 2.14295 0.149587 2.40713 0.413767L9.84736 7.85635L17.2899 0.412595C17.5541 0.148415 17.9124 -6.22431e-09 18.286 0C18.6596 6.22431e-09 19.0179 0.148415 19.2821 0.412595C19.5463 0.676776 19.6947 1.03508 19.6947 1.40869C19.6947 1.7823 19.5463 2.1406 19.2821 2.40478L11.8395 9.84853L19.2798 17.2911Z"
                    fill="black"
                  />
                </svg>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="review-container">
        <div class="container-title">리뷰 관리</div>
        <div class="container-line"></div>
        <div class="review-row">
          <svg
            class="review-profile"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle cx="40" cy="40" r="40" fill="#D9D9D9" />
          </svg>
          <div class="review-first-column">
            <span>닉네임</span>
            <div class="review-star-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="black"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="black"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="black"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="black"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="#C6C6C6"
                />
              </svg>
            </div>
          </div>
          <div class="review-second-column">
            <div class="review-grey-box-wrapper">
              <div class="review-grey-box">잘 맞아요</div>
              <div class="review-grey-box">화면과 같아요</div>
              <div class="review-grey-box">정사이즈</div>
            </div>
            <div class="review-text-container1">
              <h1>상품명 - 상품 옵션</h1>
              <h2>작성일</h2>
            </div>
            <span>리뷰 내용</span>
          </div>
          <img
            class="review-prod-img"
            src="/src/prod-img.png"
            alt=""
          />
          <div class="review-last-column">
            <span>삭제</span>
          </div>
        </div>
        <div class="review-row">
          <svg
            class="review-profile"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle cx="40" cy="40" r="40" fill="#D9D9D9" />
          </svg>
          <div class="review-first-column">
            <span>닉네임</span>
            <div class="review-star-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="black"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="black"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="black"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="black"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="#C6C6C6"
                />
              </svg>
            </div>
          </div>
          <div class="review-second-column">
            <div class="review-grey-box-wrapper">
              <div class="review-grey-box">잘 맞아요</div>
              <div class="review-grey-box">화면과 같아요</div>
              <div class="review-grey-box">정사이즈</div>
            </div>
            <div class="review-text-container1">
              <h1>상품명 - 상품 옵션</h1>
              <h2>작성일</h2>
            </div>
            <span>리뷰 내용</span>
          </div>
          <img
            class="review-prod-img"
            src="/src/prod-img.png"
            alt=""
          />
          <div class="review-last-column">
            <span>삭제</span>
          </div>
        </div>
      </div>
      <div class="follow-container">
        <div class="container-title">팔로잉/팔로워 관리</div>
        <div class="container-line"></div>
        <div class="follow-text-container">
          <div class="follow-text">팔로잉</div>
          <div class="follow-text-ontap margin-both">|</div>
          <div class="follow-text-ontap">팔로워</div>
        </div>
        <div class="follow-row">
          <svg
            class="follow-img"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle cx="40" cy="40" r="40" fill="#D9D9D9" />
          </svg>
          <div class="nickname">닉네임</div>
          <div class="following">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="9"
              viewBox="0 0 13 9"
              fill="none"
            >
              <path
                d="M4.22659 9L0 4.77341L0.6072 4.16706L4.22659 7.78645L12.013 0L12.6194 0.60635L4.22659 9Z"
                fill="#C6C6C6"
              />
            </svg>
            팔로잉
          </div>
        </div>
        <div class="follow-row">
          <svg
            class="follow-img"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle cx="40" cy="40" r="40" fill="#D9D9D9" />
          </svg>
          <div class="nickname">닉네임</div>
          <div class="non-following">+팔로우</div>
        </div>
      </div>
      <div class="board-container">
        <div class="container-title">게시글 관리</div>
        <div class="container-line"></div>
        <div class="query-option-container">
          <div class="option-text option-ontap">조회순</div>
          <div class="option-text both-small-margin">|</div>
          <div class="option-text">최신순</div>
          <div class="option-text both-small-margin">|</div>
          <div class="option-text">인기순</div>
        </div>
        <div class="img-container">
          <div class="single-img-container">
            <img src="/src/prod-img2.png" alt="" />
            <svg
              class="like-button"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="37"
              viewBox="0 0 40 37"
              fill="none"
            >
              <path
                d="M20 36.7L17.1 34.06C6.8 24.72 0 18.54 0 11C0 4.82 4.84 0 11 0C14.48 0 17.82 1.62 20 4.16C22.18 1.62 25.52 0 29 0C35.16 0 40 4.82 40 11C40 18.54 33.2 24.72 22.9 34.06L20 36.7Z"
                fill="#C6C6C6"
              />
            </svg>
            <div class="heart-view-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="15"
                viewBox="0 0 17 15"
                fill="none"
              >
                <path
                  d="M8.17439 15L6.9891 13.921C2.77929 10.1035 0 7.57766 0 4.49591C0 1.97003 1.9782 0 4.49591 0C5.91826 0 7.28338 0.662125 8.17439 1.70027C9.0654 0.662125 10.4305 0 11.8529 0C14.3706 0 16.3488 1.97003 16.3488 4.49591C16.3488 7.57766 13.5695 10.1035 9.35967 13.921L8.17439 15Z"
                  fill="#FF0000"
                />
              </svg>
              <h1>999+</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill="none"
              >
                <path
                  d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
                  fill="#C6C6C6"
                />
              </svg>
              <h2>999+</h2>
            </div>
          </div>
          <div class="single-img-container">
            <img src="/src/prod-img2.png" alt="" />
            <svg
              class="like-button"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="37"
              viewBox="0 0 40 37"
              fill="none"
            >
              <path
                d="M20 36.7L17.1 34.06C6.8 24.72 0 18.54 0 11C0 4.82 4.84 0 11 0C14.48 0 17.82 1.62 20 4.16C22.18 1.62 25.52 0 29 0C35.16 0 40 4.82 40 11C40 18.54 33.2 24.72 22.9 34.06L20 36.7Z"
                fill="#ff0000"
              />
            </svg>
            <div class="heart-view-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="15"
                viewBox="0 0 17 15"
                fill="none"
              >
                <path
                  d="M8.17439 15L6.9891 13.921C2.77929 10.1035 0 7.57766 0 4.49591C0 1.97003 1.9782 0 4.49591 0C5.91826 0 7.28338 0.662125 8.17439 1.70027C9.0654 0.662125 10.4305 0 11.8529 0C14.3706 0 16.3488 1.97003 16.3488 4.49591C16.3488 7.57766 13.5695 10.1035 9.35967 13.921L8.17439 15Z"
                  fill="#FF0000"
                />
              </svg>
              <h1>999+</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill="none"
              >
                <path
                  d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
                  fill="#C6C6C6"
                />
              </svg>
              <h2>999+</h2>
            </div>
          </div>
          <div class="single-img-container">
            <img src="/src/prod-img2.png" alt="" />
            <svg
              class="like-button"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="37"
              viewBox="0 0 40 37"
              fill="none"
            >
              <path
                d="M20 36.7L17.1 34.06C6.8 24.72 0 18.54 0 11C0 4.82 4.84 0 11 0C14.48 0 17.82 1.62 20 4.16C22.18 1.62 25.52 0 29 0C35.16 0 40 4.82 40 11C40 18.54 33.2 24.72 22.9 34.06L20 36.7Z"
                fill="#C6C6C6"
              />
            </svg>
            <div class="heart-view-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="15"
                viewBox="0 0 17 15"
                fill="none"
              >
                <path
                  d="M8.17439 15L6.9891 13.921C2.77929 10.1035 0 7.57766 0 4.49591C0 1.97003 1.9782 0 4.49591 0C5.91826 0 7.28338 0.662125 8.17439 1.70027C9.0654 0.662125 10.4305 0 11.8529 0C14.3706 0 16.3488 1.97003 16.3488 4.49591C16.3488 7.57766 13.5695 10.1035 9.35967 13.921L8.17439 15Z"
                  fill="#FF0000"
                />
              </svg>
              <h1>999+</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill="none"
              >
                <path
                  d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
                  fill="#C6C6C6"
                />
              </svg>
              <h2>999+</h2>
            </div>
          </div>
          <div class="single-img-container">
            <img src="/src/prod-img2.png" alt="" />
            <svg
              class="like-button"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="37"
              viewBox="0 0 40 37"
              fill="none"
            >
              <path
                d="M20 36.7L17.1 34.06C6.8 24.72 0 18.54 0 11C0 4.82 4.84 0 11 0C14.48 0 17.82 1.62 20 4.16C22.18 1.62 25.52 0 29 0C35.16 0 40 4.82 40 11C40 18.54 33.2 24.72 22.9 34.06L20 36.7Z"
                fill="#C6C6C6"
              />
            </svg>
            <div class="heart-view-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="15"
                viewBox="0 0 17 15"
                fill="none"
              >
                <path
                  d="M8.17439 15L6.9891 13.921C2.77929 10.1035 0 7.57766 0 4.49591C0 1.97003 1.9782 0 4.49591 0C5.91826 0 7.28338 0.662125 8.17439 1.70027C9.0654 0.662125 10.4305 0 11.8529 0C14.3706 0 16.3488 1.97003 16.3488 4.49591C16.3488 7.57766 13.5695 10.1035 9.35967 13.921L8.17439 15Z"
                  fill="#FF0000"
                />
              </svg>
              <h1>999+</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill="none"
              >
                <path
                  d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
                  fill="#C6C6C6"
                />
              </svg>
              <h2>999+</h2>
            </div>
          </div>
          <div class="single-img-container">
            <img src="/src/prod-img2.png" alt="" />
            <svg
              class="like-button"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="37"
              viewBox="0 0 40 37"
              fill="none"
            >
              <path
                d="M20 36.7L17.1 34.06C6.8 24.72 0 18.54 0 11C0 4.82 4.84 0 11 0C14.48 0 17.82 1.62 20 4.16C22.18 1.62 25.52 0 29 0C35.16 0 40 4.82 40 11C40 18.54 33.2 24.72 22.9 34.06L20 36.7Z"
                fill="#C6C6C6"
              />
            </svg>
            <div class="heart-view-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="15"
                viewBox="0 0 17 15"
                fill="none"
              >
                <path
                  d="M8.17439 15L6.9891 13.921C2.77929 10.1035 0 7.57766 0 4.49591C0 1.97003 1.9782 0 4.49591 0C5.91826 0 7.28338 0.662125 8.17439 1.70027C9.0654 0.662125 10.4305 0 11.8529 0C14.3706 0 16.3488 1.97003 16.3488 4.49591C16.3488 7.57766 13.5695 10.1035 9.35967 13.921L8.17439 15Z"
                  fill="#FF0000"
                />
              </svg>
              <h1>999+</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill="none"
              >
                <path
                  d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
                  fill="#C6C6C6"
                />
              </svg>
              <h2>999+</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/mypage.css";
</style>