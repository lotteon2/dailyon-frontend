<script setup lang='ts'>

</script>

<template>
  <div class="left-container">
    <div class="left-black-box">마이페이지</div>
    <div class="left-inner-container">
      <h1>나의 구매</h1>
      <h2><RouterLink to='/order-history'>주문/배송 조회</RouterLink></h2>
      <h2><RouterLink to=''>포인트 결제 내역</RouterLink></h2>
      <div class="left-inner-line"></div>
      <h1>나의 혜택</h1>
      <h2><RouterLink to='/point-history'>포인트 사용 내역</RouterLink></h2>
      <h2><RouterLink to='/coupons'>쿠폰 관리</RouterLink></h2>
      <h2><RouterLink to='/events'>이벤트 관리</RouterLink></h2>
      <div class="left-inner-line"></div>
      <h1>나의 관심상품</h1>
      <h2><RouterLink to='/carts'>장바구니</RouterLink></h2>
      <h2><RouterLink to='/wishlist'>찜한 상품</RouterLink></h2>
      <div class="left-inner-line"></div>
      <h1>나의 정보</h1>
      <h2><RouterLink to='/member-info'>회원정보 수정</RouterLink></h2>
      <h2><RouterLink to='/reviews'>리뷰 관리</RouterLink></h2>
      <h2>회원 탈퇴</h2>
      <div class="left-inner-line"></div>
      <h1>나의 OOTD</h1>
      <h2><RouterLink to='/follows'>팔로잉/팔로워 관리</RouterLink></h2>
      <h2><RouterLink to='/my-posts'>게시글 관리</RouterLink></h2>
      <h2><RouterLink to='/like-posts'>관심 게시글</RouterLink></h2>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/mypage-navbar.css";
</style>