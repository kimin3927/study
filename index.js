import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import TasteView from '../../views/TasteView.vue'
import HistoryView from '../../views/HistoryView.vue'
import MBTIView from '../../views/MBTIView.vue'
import FamilyView from '../../views/FamilyView.vue'
// import createListComponent from "../../components/createListComponent.vue"



Vue.use(VueRouter)

const intro = [
  // {
  //   path: '1',
  //   component: createListComponent("myname")
  // },
  // {
  //   path: '2',
  //   component: createListComponent("keep")
  // },
  {
    path: '/',
    name: '/',
    component: HomeView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/taste',
    name: 'taste',
    component: TasteView
  },
  {
    path: '/family',
    name: 'family',
    component: FamilyView
  },
  {
    path: '/MBTI',
    name: 'MBTI',
    component: MBTIView
  },
]


export default intro