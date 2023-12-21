<script setup lang='ts'>

</script>

<template>
  <div class="event-container">
    <div class="container-title">이벤트 관리</div>
    <div class="container-line"></div>
    <table>
      <col width="200px" />
      <col width="400px" />
      <col width="100px" />
      <col width="100px" />
      <col width="70px" />
      <tr class="event-table-data1">
        <td class="left-margin">이벤트명</td>
        <td class="left-align">이벤트 내용</td>
        <td>신청 일시</td>
        <td>당첨 여부</td>
        <td>
          <div class="use-button-disable">사용하기</div>
        </td>
      </tr>
      <tr class="event-table-data1">
        <td class="left-margin">이벤트명</td>
        <td class="left-align">이벤트 내용</td>
        <td>신청 일시</td>
        <td>당첨 여부</td>
        <td><div class="use-button">사용하기</div></td>
      </tr>
      <tr class="event-table-data2">
        <td class="left-margin">이벤트명</td>
        <td class="left-align">이벤트 내용</td>
        <td>신청 일시</td>
        <td>당첨 여부</td>
        <td><div class="use-button">사용하기</div></td>
      </tr>
      <tr class="event-table-data2">
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
</template>

<style scoped>
@import "@/assets/css/event.css";
</style>