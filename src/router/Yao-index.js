

// 药店路由
const Yaoprescription = () => import('@/components/Yao/Yao-prescription' /* webpackChunkName: "prescription" */ );       // 处方医生列表资料上传
const PrescriptionList = () => import('@/components/Yao/prescription/prescriptionList' /* webpackChunkName: "prescription" */);  // 处方单申请页
const PrescriptionApply = () => import('@/components/Yao/prescription/prescriptionApply' /* webpackChunkName: "prescription" */); // 处方单申请列表页
const PrescriptionRecords = () => import('@/components/Yao/prescription/prescriptionRecords' /* webpackChunkName: "prescription" */); // 处方单记录
const AddApply = () => import('@/components/Yao/prescription/addApply' /* webpackChunkName: "prescription" */);  // 创建处方单
const YaoprescriptionList = () => import('@/components/Yao/Yao-prescriptionList' /* webpackChunkName: "prescription" */);  // 处方单列表
const PrescriptionCheck = () => import('@/components/Yao/prescriptionList/prescriptionCheck' /* webpackChunkName: "prescription" */);   //  处方单审核

export default [
    // 处方
    {
    path: '/server/Yaodoctorprescription',
    name: '处方单医生资料上传',
    component: Yaoprescription
    },
    {
    path: '/server/Yaodoctorprescription/prescriptionList',
    name: '处方单医生列表',
    component: PrescriptionList
    },
    {
    path: '/server/Yaodoctorprescription/prescriptionApply',
    name: '处方单申请列表',
    component: PrescriptionApply
    },
    {
    path: '/server/Yaodoctorprescription/prescriptionRecords',
    name: '处方单申记录',
    component: PrescriptionRecords
    },
    {
    path: '/server/Yaodoctorprescription/addApply',
    name: '创建处方单',
    component: AddApply
    },
    {
    path: '/server/YaoprescriptionList',
    name: '处方单列表',
    component: YaoprescriptionList
    },
    {
    path: '/server/YaoprescriptionList/prescriptionCheck',
    name: '处方单详情',
    component: PrescriptionCheck
    },
]