import { computed, watch } from 'vue'

import useRouterLink, { useRouterLinkProps } from '../../composables/private/use-router-link.js'
import useTab, { useTabProps, useTabEmits } from './use-tab.js'

import { createComponent } from '../../utils/private/create.js'

export default createComponent({
  name: 'QRouteTab',

  props: {
    ...useRouterLinkProps,
    ...useTabProps
  },

  emits: useTabEmits,

  setup (props, { slots, emit }) {
    const rData = useRouterLink()

    const { renderTab, $tabs } = useTab(
      props,
      slots,
      emit,
      {
        exact: computed(() => props.exact),
        ...rData
      }
    )

    watch(() => props.name + props.exact + (rData.linkRoute.value || {}).href, () => {
      $tabs.verifyRouteModel()
    })

    return () => renderTab(rData.linkTag.value, rData.linkProps.value)
  }
})
