<script setup lang="ts"></script>

<template>
  <div class="ootd-detail-container">
    <div class="ootd-detail-body">
      <div class="ootd-detail-content-body">
        <div class="ootd-detail-header">
          <div class="ootd-detail-header-top">
            <div class="ootd-detail-header-title-wrapper">
              <div class="ootd-detail-header-title-text">게시글 제목</div>
            </div>
            <div class="ootd-detail-header-control-button-wrapper">
              <div class="ootd-detail-header-edit-button-wrapper">
                <div class="ootd-detail-header-edit-button-text">수정</div>
              </div>
              <div class="ootd-detail-header-delete-button-wrapper">
                <div class="ootd-detail-header-delete-button-text">삭제</div>
              </div>
            </div>
          </div>
          <div class="ootd-detail-header-middle">
            <div class="ootd-detail-header-content-info-wrapper">
              <div class="ootd-detail-header-writer-profile-image-wrapper">
                <img
                  src="@/assets/images/default-profile-image.png"
                  class="ootd-detail-header-writer-profile-image"
                />
              </div>
              <div class="ootd-detail-header-writer-info-wrapper">
                <div class="ootd-detail-header-writer-nickname-wrapper">
                  <div class="ootd-detail-header-writer-nickname-text">작성자 닉네임</div>
                </div>
                <div class="ootd-detail-header-content-created-date-wrapper">
                  <div class="ootd-detail-header-content-created-date-text">작성일</div>
                </div>
              </div>
            </div>
            <div class="ootd-detail-header-follow-wrapper">
              <div class="ootd-detail-header-follow">
                <div class="ootd-detail-header-follow-text">+팔로우</div>
              </div>
              <div class="ootd-detail-header-following">
                <svg
                  class="ootd-detail-header-following-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                >
                  <path
                    d="M4.91678 9.5L0.690186 5.27341L1.29739 4.66706L4.91678 8.28645L12.7032 0.5L13.3096 1.10635L4.91678 9.5Z"
                    fill="#C6C6C6"
                  />
                </svg>
                <div class="ootd-detail-header-following-text">팔로잉</div>
              </div>
            </div>
          </div>
          <div class="ootd-detail-header-bottom">
            <div class="ootd-detail-fashion-info-wrapper">
              <div class="ootd-detail-size-info-wrapper">
                <div class="ootd-detail-size-info-text-wrapper">
                  <div class="ootd-detail-size-info-text">키/몸무게</div>
                </div>
                <div class="ootd-detail-size-info-text-wrapper">
                  <div class="ootd-detail-size-real-info-text">165/53</div>
                </div>
              </div>
              <div class="ootd-detail-fashion-size-info-wrapper">
                <div class="ootd-detail-fashion-size-info-text-wrapper">
                  <div class="ootd-detail-fashion-size-info-text">사이즈</div>
                </div>
                <div class="ootd-detail-fashion-size-info-text-wrapper">
                  <div class="ootd-detail-fashion-size-real-info-text">상품명 - 사이즈</div>
                </div>
              </div>
            </div>
            <div class="ootd-detail-tag-info-wrapper">
              <div class="ootd-detail-tag-title-wrapper">
                <div class="ootd-detail-tag-title-text">태그</div>
              </div>
              <div class="ootd-detail-tag-content-wrapper">
                <div v-for="n in 3" class="ootd-detail-tag-button-wrapper">
                  <div class="ootd-detail-tag-button-text">태그 {{ n }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ootd-detail-content">
          <div class="ootd-detail-content-description-wrapper">
            <div class="ootd-detail-content-description-text">게시글 내용</div>
          </div>
          <div class="ootd-detail-content-image-wrapper">
            <img
              class="ootd-detail-content-image"
              src="@/assets/images/ootd-detail-image-example.png"
            />
          </div>
          <div class="ootd-detail-content-product-list-wrapper">
            <div class="ootd-detail-content-product-list-back-button-wrapper">
              <svg
                class="ootd-detail-content-product-list-back-button"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="31"
                viewBox="0 0 18 31"
                fill="none"
              >
                <path
                  d="M15.4865 30.1775C15.2899 30.1799 15.0951 30.1412 14.9144 30.0638C14.7338 29.9863 14.5713 29.872 14.4375 29.728L0.951015 16.2415C0.351615 15.6421 0.351615 14.713 0.951015 14.1136L14.4375 0.65707C15.0369 0.0576694 15.966 0.0576694 16.5654 0.65707C17.1648 1.25647 17.1648 2.18554 16.5654 2.78494L4.12784 15.1925L16.5654 27.6301C17.1648 28.2295 17.1648 29.1586 16.5654 29.758C16.2657 30.0577 15.8761 30.2075 15.5164 30.2075L15.4865 30.1775Z"
                  fill="black"
                />
              </svg>
            </div>
            <div class="ootd-detail-content-product-list-image-wrapper">
              <div class="ootd-detail-content-product-image-wrapper" v-for="n in 4">
                <img
                  class="ootd-detail-content-product-image"
                  src="@/assets/images/ootd-detail-product-example.png"
                />
              </div>
            </div>
            <div class="ootd-detail-content-product-list-forward-button-wrapper">
              <svg
                class="ootd-detail-content-product-list-forward-button"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="31"
                viewBox="0 0 17 31"
                fill="none"
              >
                <path
                  d="M1.51339 30.2074C1.31686 30.2098 1.122 30.1711 0.941349 30.0936C0.760696 30.0162 0.598245 29.9018 0.464441 29.7579C-0.134957 29.1585 -0.134957 28.2294 0.464441 27.63L12.902 15.1925L0.464441 2.78493C-0.134957 2.18553 -0.134957 1.25647 0.464441 0.657068C1.06384 0.0576699 1.99291 0.0576699 2.59231 0.657068L16.0488 14.1735C16.6482 14.7729 16.6482 15.702 16.0488 16.3014L2.56234 29.7579C2.26264 30.0576 1.87303 30.2074 1.51339 30.2074Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="ootd-detail-footer-left">
        <div class="ootd-detail-footer-count-wrapper">
          <div class="ootd-detail-footer-like-count-wrapper">
            <div class="ootd-detail-footer-like-count">좋아요 N</div>
          </div>
          <div class="ootd-detail-footer-comment-count-wrapper">
            <div class="ootd-detail-footer-comment-count">댓글 N</div>
          </div>
          <div class="ootd-detail-footer-view-count-wrapper">
            <div class="ootd-detail-footer-view-count">조회 N</div>
          </div>
        </div>
        <div class="ootd-detail-footer-writer-detail-wrapper">
          <div class="ootd-detail-footer-writer-detail-left-wrapper">
            <img
              class="ootd-detail-footer-writer-profile-image"
              src="@/assets/images/default-profile-image.png"
            />
            <div class="ootd-detail-footer-writer-detail-wrapper">
              <div class="ootd-detail-footer-writer-nickname-wrapper">
                <div class="ootd-detail-footer-writer-nickname">작성자 닉네임</div>
              </div>
              <div class="ootd-detail-footer-created-date-wrapper">
                <div class="ootd-detail-footer-created-date">작성일</div>
              </div>
            </div>
            <div class="ootd-detail-footer-follow-wrapper">
              <div class="ootd-detail-footer-follow">
                <div class="ootd-detail-footer-follow-text">+팔로우</div>
              </div>
              <div class="ootd-detail-footer-following">
                <svg
                  class="ootd-detail-footer-following-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                >
                  <path
                    d="M4.91678 9.5L0.690186 5.27341L1.29739 4.66706L4.91678 8.28645L12.7032 0.5L13.3096 1.10635L4.91678 9.5Z"
                    fill="#C6C6C6"
                  />
                </svg>
                <div class="ootd-detail-footer-following-text">팔로잉</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ootd-detail-divide-line-wrapper">
        <div class="ootd-detail-divide-line"></div>
      </div>
      <div class="ootd-detail-comment-wrapper">
        <div class="ootd-detail-comment-header-wrapper">
          <div class="ootd-detail-comment-count-wrapper">
            <div class="ootd-detail-comment-count-text-wrapper">
              <div class="ootd-detail-comment-count-text">댓글</div>
            </div>
            <div class="ootd-detail-comment-count-real-text-wrapper">
              <div class="ootd-detail-comment-count-real-text">N</div>
            </div>
          </div>
          <div class="ootd-detail-comment-input-box-wrapper">
            <div class="ootd-detail-comment-input-wrapper">
              <input class="ootd-detail-comment-input" type="text" />
            </div>
            <div class="ootd-detail-comment-input-box-decoration-wrapper">
              <div class="ootd-detail-comment-input-box-decoration-text">입력</div>
            </div>
          </div>
        </div>
        <div class="ootd-detail-comment-body-wrapper">
          <div v-for="n in 2" class="ootd-detail-comment-box-wrapper">
            <img
              class="ootd-detail-comment-profile-image"
              src="@/assets/images/default-profile-image.png"
            />
            <div class="ootd-detail-comment-box-wrapper-2">
              <div class="ootd-detail-comment-box-header-wrapper">
                <div class="ootd-detail-comment-box-header-left-wrapper">
                  <div class="ootd-detail-comment-box-header-nickname-wrapper">
                    <div class="ootd-detail-comment-box-header-nickname-text">작성자 닉네임</div>
                  </div>
                  <div class="ootd-detail-comment-box-header-content-wrapper">
                    <div class="ootd-detail-comment-box-header-content-text">댓글 내용</div>
                  </div>
                  <div class="ootd-detail-comment-box-header-content-metadata-wrapper">
                    <div class="ootd-detail-comment-box-header-content-created-date-wrapper">
                      <div class="ootd-detail-comment-box-header-content-created-date-text">
                        작성일
                      </div>
                    </div>
                    <div class="ootd-detail-comment-box-header-content-comment-wrapper">
                      <div class="ootd-detail-comment-box-header-content-comment-button">
                        답글달기
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ootd-detail-comment-box-header-right-wrapper">
                  <div class="ootd-detail-comment-box-delete-text">삭제</div>
                </div>
              </div>
              <div v-for="n in 2" class="ootd-detail-comment-box-wrapper">
                <img
                  class="ootd-detail-comment-profile-image"
                  src="@/assets/images/default-profile-image.png"
                />
                <div class="ootd-detail-comment-box-wrapper-2">
                  <div class="ootd-detail-comment-box-header-wrapper">
                    <div class="ootd-detail-comment-box-header-left-wrapper">
                      <div class="ootd-detail-comment-box-header-nickname-wrapper">
                        <div class="ootd-detail-comment-box-header-nickname-text">
                          작성자 닉네임
                        </div>
                      </div>
                      <div class="ootd-detail-comment-box-header-content-wrapper">
                        <div class="ootd-detail-comment-box-header-content-text">댓글 내용</div>
                      </div>
                      <div class="ootd-detail-comment-box-header-content-metadata-wrapper">
                        <div class="ootd-detail-comment-box-header-content-created-date-wrapper">
                          <div class="ootd-detail-comment-box-header-content-created-date-text">
                            작성일
                          </div>
                        </div>
                        <div class="ootd-detail-comment-box-header-content-comment-wrapper">
                          <div class="ootd-detail-comment-box-header-content-comment-button">
                            답글달기
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="ootd-detail-comment-box-header-right-wrapper">
                      <div class="ootd-detail-comment-box-delete-text">삭제</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ootd-detail-reply-box-wrapper">
                <div class="ootd-detail-reply-input-wrapper">
                  <input class="ootd-detail-reply-input" placeholder="@댓글 닉네임" />
                </div>
                <div class="ootd-detail-reply-input-hint-wrapper">
                  <div class="ootd-detail-reply-input-hint-text">입력</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ootd-detail-comment-pagination-wrapper">
          <div class="ootd-detail-comment-back-button-wrapper">
            <svg
              class="ootd-detail-comment-back-button"
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
            >
              <path
                d="M7.41563 13.3557C7.33046 13.3567 7.24602 13.3399 7.16774 13.3064C7.08946 13.2728 7.01906 13.2232 6.96108 13.1609L1.11692 7.3167C0.857184 7.05696 0.857184 6.65437 1.11692 6.39463L6.96108 0.563458C7.22082 0.303717 7.62342 0.303717 7.88316 0.563458C8.1429 0.823198 8.1429 1.22579 7.88316 1.48554L2.49355 6.86216L7.88316 12.2518C8.1429 12.5115 8.1429 12.9141 7.88316 13.1738C7.75329 13.3037 7.58446 13.3687 7.42861 13.3687L7.41563 13.3557Z"
                fill="#C6C6C6"
              />
            </svg>
          </div>
          <div class="ootd-detail-comment-page-button-wrapper selected">
            <div class="ootd-detail-comment-page-button selected">1</div>
          </div>
          <div class="ootd-detail-comment-page-button-wrapper" v-for="n in 2">
            <div class="ootd-detail-comment-page-button">
              {{ n + 1 }}
            </div>
          </div>
          <div class="ootd-detail-comment-front-button-wrapper">
            <svg
              class="ootd-detail-comment-front-button"
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
            >
              <path
                d="M1.57794 13.3686C1.49277 13.3696 1.40834 13.3528 1.33005 13.3193C1.25177 13.2858 1.18137 13.2362 1.12339 13.1738C0.863654 12.9141 0.863654 12.5115 1.12339 12.2517L6.51299 6.86214L1.12339 1.48553C0.863654 1.22579 0.863654 0.823196 1.12339 0.563457C1.38313 0.303718 1.78573 0.303718 2.04547 0.563457L7.87662 6.42058C8.13636 6.68032 8.13636 7.08291 7.87662 7.34265L2.03248 13.1738C1.90261 13.3037 1.73378 13.3686 1.57794 13.3686Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="top4-ootd-wrapper">
        <div class="top4-ootd-title-wrapper">
          <div class="top4-ootd-title-text">TOP 4 OOTD</div>
        </div>
        <div class="top4-ootd-list-wrapper">
          <div v-for="n in 4" class="top4-ootd-post-card-image-wrapper">
            <img
              class="top4-ootd-post-card-image"
              src="@/assets/images/ootd-detail-image-example.png"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="ootd-detail-like-button-wrapper">
      <div class="ootd-detail-like-button">
        <svg
          class="ootd-detail-like-button-icon"
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
      </div>
      <div class="ootd-detail-like-text-wrapper">
        <div class="ootd-detail-like-text">999+</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/ootd-detail.css';
</style>
