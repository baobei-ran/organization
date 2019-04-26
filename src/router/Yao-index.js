

// 药店路由
import Yaoprescription from '@/components/Yao/Yao-prescription';       // 处方医生列表资料上传
import PrescriptionList from '@/components/Yao/prescription/prescriptionList';  // 处方单申请页
import PrescriptionApply from '@/components/Yao/prescription/prescriptionApply'; // 处方单申请列表页
import PrescriptionRecords from '@/components/Yao/prescription/prescriptionRecords'; // 处方单记录
import AddApply from '@/components/Yao/prescription/addApply';  // 创建处方单
import YaoprescriptionList from '@/components/Yao/Yao-prescriptionList';  // 处方单列表
import PrescriptionCheck from '@/components/Yao/prescriptionList/prescriptionCheck';   //  处方单审核

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