import { ref, reactive, computed } from 'vue'

export interface Report {
  id?: string
  title: string
  date: string
  status: string
  description?: string
  image?: string
  priority?: string
  progress?: number
  tags?: string[]
}

export function useReports() {
  const selectedStatus = ref<string>('all')
  const searchQuery = ref<string>('')
  const currentPage = ref<number>(1)
  const itemsPerPage = ref<number>(8)

  const reports = reactive<Report[]>([
    {
      id: '1',
      title: 'Новая система освещения в парке',
      date: '07.11.2024',
      status: 'Новый',
      description: 'Предложение установить энергосберегающие фонари',
      priority: 'medium',
      tags: ['освещение', 'парк']
    },
    {
      id: '2',
      title: 'Создание велодорожек в центре города',
      date: '06.11.2024',
      status: 'Новый',
      description: 'Инициатива по развитию велоинфраструктуры',
      priority: 'high',
      tags: ['велодорожки', 'инфраструктура']
    },
    {
      id: '3',
      title: 'Прорыв водопровода на улице Центральной',
      date: '15.10.2024',
      status: 'Срочно',
      description: 'Затопление проезжей части, требуется срочный ремонт',
      priority: 'critical',
      tags: ['авария', 'водопровод']
    },
    {
      id: '4',
      title: 'Обрыв электропроводов',
      date: '14.10.2024',
      status: 'Срочно',
      description: 'Опасность поражения током, отключение электричества',
      priority: 'critical',
      tags: ['электричество', 'авария']
    },
    {
      id: '5',
      title: 'Ремонт дороги на улице Ленина',
      date: '12.10.2024',
      status: 'В процессе',
      description: 'Ямочный ремонт асфальтового покрытия',
      progress: 65,
      priority: 'medium',
      tags: ['дороги', 'ремонт']
    },
    {
      id: '6',
      title: 'Уборка мусора в парке Горького',
      date: '10.10.2024',
      status: 'Решено',
      priority: 'low',
      tags: ['уборка', 'парк']
    },
    {
      id: '7',
      title: 'Освещение на проспекте Мира',
      date: '05.10.2024',
      status: 'В процессе',
      description: 'Замена неработающих фонарей',
      progress: 30,
      priority: 'medium',
      tags: ['освещение', 'фонари']
    },
    {
      id: '8',
      title: 'Починка детской площадки',
      date: '01.10.2024',
      status: 'Решено',
      priority: 'medium',
      tags: ['детская площадка', 'ремонт']
    }
  ])

  // Computed properties
  const filteredReports = computed(() => {
    let filtered = reports
    
    // Filter by status
    if (selectedStatus.value !== 'all') {
      filtered = filtered.filter(report => report.status === selectedStatus.value)
    }
    
    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(query) ||
        report.description?.toLowerCase().includes(query) ||
        report.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    return filtered
  })

  const paginatedReports = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredReports.value.slice(start, end)
  })

  const totalReports = computed(() => reports.length)
  const newReports = computed(() => reports.filter(r => r.status === 'Новый').length)
  const solvedReports = computed(() => reports.filter(r => r.status === 'Решено').length)
  const urgentReports = computed(() => reports.filter(r => r.status === 'Срочно').length)
  const totalPages = computed(() => Math.ceil(filteredReports.value.length / itemsPerPage.value))

  // Methods
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case 'Новый': return 'text-purple-400'
      case 'Срочно': return 'text-red-400'
      case 'Решено': return 'text-green-400'
      case 'В процессе': return 'text-yellow-400'
      case 'На рассмотрении': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusDotClass = (status: string): string => {
    switch (status) {
      case 'Новый': return 'bg-purple-400'
      case 'Срочно': return 'bg-red-400'
      case 'Решено': return 'bg-green-400'
      case 'В процессе': return 'bg-yellow-400'
      case 'На рассмотрении': return 'bg-blue-400'
      default: return 'bg-gray-400'
    }
  }

  const getReportCardClass = (report: Report): string => {
    switch (report.status) {
      case 'Новый': return 'border-purple-500/50 bg-purple-900/10'
      case 'Срочно': return 'border-red-500/50 bg-red-900/10'
      default: return ''
    }
  }

  const getPhotoClass = (report: Report): string => {
    switch (report.status) {
      case 'Новый': return 'bg-purple-700/50'
      case 'Срочно': return 'bg-red-700/50'
      default: return 'bg-gray-700'
    }
  }

  const formatDate = (date: string): string => {
    return date
  }

  const nextPage = (): void => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = (): void => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const addReport = (report: Omit<Report, 'id'>): void => {
    const newReport: Report = {
      ...report,
      id: Date.now().toString()
    }
    reports.push(newReport)
  }

  const updateReport = (id: string, updatedReport: Partial<Report>): void => {
    const index = reports.findIndex(report => report.id === id)
    if (index !== -1) {
      reports[index] = { ...reports[index], ...updatedReport }
    }
  }

  const deleteReport = (id: string): void => {
    const index = reports.findIndex(report => report.id === id)
    if (index !== -1) {
      reports.splice(index, 1)
    }
  }

  return {
    // Refs
    selectedStatus,
    searchQuery,
    currentPage,
    itemsPerPage,
    
    // Data
    reports,
    
    // Computed
    filteredReports,
    paginatedReports,
    totalReports,
    newReports,
    solvedReports,
    urgentReports,
    totalPages,
    
    // Methods
    getStatusColorClass,
    getStatusDotClass,
    getReportCardClass,
    getPhotoClass,
    formatDate,
    nextPage,
    prevPage,
    addReport,
    updateReport,
    deleteReport
  }
}