<script setup lang='ts'>
import { inject, onBeforeMount, ref, watch } from 'vue'
import type { CommentResponse, CreateCommentRequest, CreateReplyCommentRequest } from '@/apis/ootd/CommentDto'
import { createComment, createReplyComment, deleteComment, getComments } from '@/apis/ootd/CommentService'
import { useRoute } from 'vue-router'
import PaginationComponent from '@/components/ootd/PaginationComponent.vue'
import { useMemberStore } from '@/stores/member/MemberStore'
import { debounce } from 'lodash'
import { AxiosError } from 'axios'
import { confirmModal, infoModal, successModal, warningModal } from '@/utils/Modal'

const openInternalServerErrorNotification: Function | undefined = inject('openInternalServerErrorNotification')

const VITE_STATIC_IMG_URL = ref<string>(import.meta.env.VITE_STATIC_IMG_URL)

const route = useRoute()
const postId = ref<number>(Number(route.params.id))

const memberStore = useMemberStore()
const memberId = memberStore.getMemberInfo().memberId

const requestPage = ref<number>(0)
const requestSize = ref<number>(5)
const requestSort = ref<string>('createdAt,desc')
const comments = ref<Array<CommentResponse>>()
const totalPages = ref<number>()
const totalElements = ref<number>()

const fetchDefaultData = async () => {
  try {
    const commentPageResponse = await getComments(postId.value, 0, requestSize.value, requestSort.value)
    comments.value = commentPageResponse.comments
    totalPages.value = commentPageResponse.totalPages
    totalElements.value = commentPageResponse.totalElements
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response !== undefined) {
        if (error.response.status >= 500) {
          if (openInternalServerErrorNotification !== undefined) {
            openInternalServerErrorNotification()
          }
        }
      }
    }
  }
}

onBeforeMount(async () => {
  await fetchDefaultData()
})

const isCommentRegistered = ref<boolean>(false)
watch(isCommentRegistered, async (afterIsCommentRegistered, beforeIsCommentRegistered) => {
  if (afterIsCommentRegistered) {
    await fetchDefaultData()
    isCommentRegistered.value = false
  }
})

const onChangePage = async (page: number) => {
  if (page >= 0 && page < totalPages.value!) {
    requestPage.value = page
  }
}

watch(requestPage, async (afterPage, beforePage) => {
  if (afterPage < totalPages.value!) {
    const commentPageResponse = await getComments(postId.value, afterPage, requestSize.value, 'createdAt,desc')
    comments.value = commentPageResponse.comments
    totalPages.value = commentPageResponse.totalPages
    totalElements.value = commentPageResponse.totalElements
  }
})

const createCommentRequest = ref<CreateCommentRequest>({
  description: ''
})

const onSubmitComment = debounce(async () => {
  if (!isCommentRegistered.value) {
    if (memberId === null) {
      await infoModal('알림', '로그인이 필요합니다.')
    } else if (createCommentRequest.value.description === ''
      || createCommentRequest.value.description.length < 5 || createCommentRequest.value.description.length > 140) {
      await successModal('알림', '댓글은 최소 5자 최대 140자까지 등록할 수 있습니다.')
    } else {
      if (!isCommentRegistered.value) {
        try {
          await createComment(postId.value, createCommentRequest.value)
          await successModal('알림', '댓글을 성공적으로 등록하였습니다.')
          createCommentRequest.value.description = ''
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response !== undefined) {
              if (error.response.status >= 500) {
                if (openInternalServerErrorNotification !== undefined) {
                  openInternalServerErrorNotification()
                }
              }
            }
          }
        }
      }
    }
    isCommentRegistered.value = true
  }
}, 500)

const isOpenReplyCommentInput = ref<Set<number>>(new Set<number>())
const onOpenReplyCommentInput = async (commentId: number) => {
  isOpenReplyCommentInput.value.has(commentId)
    ? isOpenReplyCommentInput.value.delete(commentId) : isOpenReplyCommentInput.value.add(commentId)
}

const createReplyCommentRequest = ref<CreateReplyCommentRequest>({
  description: ''
})

const onSubmitReplyComment = debounce(async (commentId: number) => {
  if (!isCommentRegistered.value) {
    if (memberId === null) {
      await infoModal('알림', '로그인이 필요합니다.')
    } else if (createReplyCommentRequest.value.description === ''
      || createReplyCommentRequest.value.description.length < 5 || createReplyCommentRequest.value.description.length > 140) {
      await warningModal('알림', '답글은 최소 5자 최대 140자까지 등록할 수 있습니다.')
    } else {
      if (!isCommentRegistered.value) {
        try {
          await createReplyComment(postId.value, commentId, createReplyCommentRequest.value)
          await successModal('알림', '답글을 성공적으로 등록하였습니다.')
          createReplyCommentRequest.value.description = ''
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response !== undefined) {
              if (error.response.status >= 500) {
                if (openInternalServerErrorNotification !== undefined) {
                  openInternalServerErrorNotification()
                }
              }
            }
          }
        }
      }
    }
    isCommentRegistered.value = true
  }
}, 500)

const onDeleteComment = async (commentId: number) => {
  const isConfirm = await confirmModal('진행 여부 확인', '댓글을 삭제하시겠습니까?')
  if (isConfirm) {
    try {
      await deleteComment(postId.value, commentId)
      await successModal('알림', '댓글을 성공적으로 삭제하였습니다.')
      await fetchDefaultData()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response !== undefined) {
          if (error.response.status >= 500) {
            if (openInternalServerErrorNotification !== undefined) {
              openInternalServerErrorNotification()
            }
          }
        }
      }
    }
  }
}

const onDeleteReplyComment = async (commentId: number) => {
  const isConfirm = await confirmModal('진행 여부 확인', '답글을 삭제하시겠습니까?')
  if (isConfirm) {
    try {
      await deleteComment(postId.value, commentId)
      await successModal('알림', '답글을 성공적으로 삭제하였습니다.')
      await fetchDefaultData()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response !== undefined) {
          if (error.response.status >= 500) {
            if (openInternalServerErrorNotification !== undefined) {
              openInternalServerErrorNotification()
            }
          }
        }
      }
    }
  }
}

</script>

<template>
  <div class='ootd-detail-comment-wrapper'>

    <div class='ootd-detail-comment-header-wrapper'>
      <div class='ootd-detail-comment-count-wrapper'>
        <div class='ootd-detail-comment-count-text-wrapper'>
          <div class='ootd-detail-comment-count-text'>
            댓글
          </div>
        </div>
        <div class='ootd-detail-comment-count-real-text-wrapper'>
          <div class='ootd-detail-comment-count-real-text'>
            {{ totalElements }}
          </div>
        </div>
      </div>

    </div>
    <div class='ootd-detail-comment-input-box-wrapper'>
      <div class='ootd-detail-comment-input-wrapper'>
        <input class='ootd-detail-comment-input' type='text'
               v-model='createCommentRequest.description'
               @keyup.enter='onSubmitComment'>
      </div>
      <div class='ootd-detail-comment-input-box-decoration-wrapper'>
        <div class='ootd-detail-comment-input-box-decoration-text'
             :class='{"hover": createCommentRequest.description !== ""}'
             @click='onSubmitComment'>
          입력
        </div>
      </div>
    </div>
    <div class='ootd-detail-comment-body-wrapper'>
      <div v-for='comment in comments' :key='comment.id' class='ootd-detail-comment-box-wrapper'>
        <RouterLink :to='`/ootds/profile/${comment.member.id}`'>
          <img class='ootd-detail-comment-profile-image' :src='`${VITE_STATIC_IMG_URL}${comment.member.profileImgUrl}`'>
        </RouterLink>
        <div class='ootd-detail-comment-box-wrapper-2'>
          <div class='ootd-detail-comment-box-header-wrapper'>
            <div class='ootd-detail-comment-box-header-left-wrapper'>
              <div class='ootd-detail-comment-box-header-nickname-wrapper'>
                <RouterLink :to='`/ootds/profile/${comment.member.id}`'
                            class='ootd-detail-comment-box-header-nickname-text'>
                  {{ comment.member.nickname }}
                </RouterLink>
              </div>
              <div class='ootd-detail-comment-box-header-content-wrapper'>
                <div v-if='!comment.isDeleted' class='ootd-detail-comment-box-header-content-text'>
                  {{ comment.description }}
                </div>
                <div v-else class='ootd-detail-comment-box-header-content-text'>
                  삭제된 댓글입니다.
                </div>
              </div>
              <div class='ootd-detail-comment-box-header-content-metadata-wrapper'>
                <div class='ootd-detail-comment-box-header-content-created-date-wrapper'>
                  <div class='ootd-detail-comment-box-header-content-created-date-text'>
                    {{ comment.createdAt }}
                  </div>
                </div>
                <div class='ootd-detail-comment-box-header-content-comment-wrapper'>
                  <div class='ootd-detail-comment-box-header-content-comment-button'
                       @click='onOpenReplyCommentInput(comment.id)'>
                    답글달기
                  </div>
                </div>
              </div>
            </div>
            <div class='ootd-detail-comment-box-header-right-wrapper'>
              <div v-if='comment.member.id === memberId && !comment.isDeleted'
                   class='ootd-detail-comment-box-delete-text'
                   @click='onDeleteComment(comment.id)'>
                삭제
              </div>
            </div>
          </div>
          <div v-if='isOpenReplyCommentInput.has(comment.id)' class='ootd-detail-reply-box-wrapper'>
            <div class='ootd-detail-reply-input-wrapper'>
              <input class='ootd-detail-reply-input'
                     v-model='createReplyCommentRequest.description'
                     @keyup.enter='onSubmitReplyComment(comment.id)'>
            </div>
            <div class='ootd-detail-reply-input-hint-wrapper'>
              <div class='ootd-detail-reply-input-hint-text'
                   :class='{"hover": createReplyCommentRequest.description !== ""}'
                   @click='onSubmitReplyComment(comment.id)'>입력
              </div>
            </div>
          </div>
          <div v-for='replyComment in comment.replyComments' :key='replyComment.id'
               class='ootd-detail-comment-box-wrapper'>
            <RouterLink :to='`/ootds/profile/${replyComment.member.id}`'>
              <img class='ootd-detail-comment-profile-image'
                   :src='`${VITE_STATIC_IMG_URL}${replyComment.member.profileImgUrl}`'>
            </RouterLink>
            <div class='ootd-detail-comment-box-wrapper-2'>
              <div class='ootd-detail-comment-box-header-wrapper'>
                <div class='ootd-detail-comment-box-header-left-wrapper'>
                  <div class='ootd-detail-comment-box-header-nickname-wrapper'>
                    <RouterLink :to='`/ootds/profile/${replyComment.member.id}`'
                                class='ootd-detail-comment-box-header-nickname-text'>
                      {{ replyComment.member.nickname }}
                    </RouterLink>
                  </div>
                  <div class='ootd-detail-comment-box-header-content-wrapper'>
                    <div v-if='!replyComment.isDeleted' class='ootd-detail-comment-box-header-content-text'>
                      {{ replyComment.description }}
                    </div>
                    <div v-else class='ootd-detail-comment-box-header-content-text'>
                      삭제된 답글입니다.
                    </div>
                  </div>
                  <div class='ootd-detail-comment-box-header-content-metadata-wrapper'>
                    <div class='ootd-detail-comment-box-header-content-created-date-wrapper'>
                      <div class='ootd-detail-comment-box-header-content-created-date-text'>
                        {{ replyComment.createdAt }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class='ootd-detail-comment-box-header-right-wrapper'>
                  <div v-if='replyComment.member.id === memberId && !replyComment.isDeleted'
                       class='ootd-detail-comment-box-delete-text'
                       @click='onDeleteReplyComment(replyComment.id)'>
                    삭제
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaginationComponent :onChangePage='onChangePage' :requestPage='requestPage' :totalPages='totalPages' />
  </div>
</template>

<style scoped>
@import "@/assets/css/ootd/ootd-post-comment.css";
</style>