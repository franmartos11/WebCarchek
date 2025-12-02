"use server"

interface VehicleData {
  ID?: string
  FECHA?: string
  "FECHA CIERRE"?: string
  "VEHICULO ASOCIADO": string
  MODELO?: string
  "CLIENTE ASOCIADO"?: string
  SEGURO?: string
  "N SINIESTRO"?: string
  AREA: string
  DESCRIPCION?: string
  [key: string]: string | undefined
}

interface ClienteData {
  ID: string
  NOMBRE?: string
  APELLIDO?: string
  DNI?: string
  [key: string]: string | undefined
}

async function searchCliente(clienteId: string, apiKey: string): Promise<string> {
  try {
    const APP_ID = "b50db9bd-7641-4568-a01f-6d3d2c02a59e"
    const TABLE_NAME = "CLIENTE"
    const API_URL = `https://api.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/Action`

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ApplicationAccessKey: apiKey,
      },
      body: JSON.stringify({
        Action: "Find",
        Properties: {
          Locale: "es-ES",
          Selector: `Filter(CLIENTE, [ID] = "${clienteId}")`,
        },
      }),
    })

    if (!response.ok) {
      return clienteId // Si falla, retorna el ID
    }

    const data: ClienteData[] = await response.json()

    if (data && data.length > 0) {
      const cliente = data[0]
      if (cliente.NOMBRE && cliente.APELLIDO) {
        return `${cliente.NOMBRE} ${cliente.APELLIDO}`
      } else if (cliente.NOMBRE) {
        return cliente.NOMBRE
      }
    }

    return clienteId
  } catch (err) {
    return clienteId
  }
}

export async function searchVehicle(patente: string): Promise<{
  success: boolean
  data?: VehicleData & { clienteNombre?: string }
  error?: string
}> {
  try {
    if (!patente.trim()) {
      return { success: false, error: "Por favor ingresa una patente" }
    }

    const API_KEY = process.env.APPSHEET_API_KEY

    if (!API_KEY) {
      return {
        success: false,
        error: "Configuración de API incompleta. Por favor configura APPSHEET_API_KEY.",
      }
    }

    const APP_ID = "b50db9bd-7641-4568-a01f-6d3d2c02a59e"
    const TABLE_NAME = "ALISTAJE"
    const API_URL = `https://api.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/Action`

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ApplicationAccessKey: API_KEY,
      },
      body: JSON.stringify({
        Action: "Find",
        Properties: {
          Locale: "es-ES",
          Selector: `Filter(ALISTAJE, [VEHICULO ASOCIADO] = "${patente.toUpperCase()}")`,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error ${response.status}: ${errorText}`)
    }

    const data = await response.json()

    if (data && data.length > 0) {
      const vehicleData = data[0]

      let clienteNombre = vehicleData["CLIENTE ASOCIADO"]
      if (clienteNombre) {
        clienteNombre = await searchCliente(clienteNombre, API_KEY)
      }

      return {
        success: true,
        data: {
          ...vehicleData,
          clienteNombre,
        },
      }
    } else {
      return { success: false, error: "No se encontró ningún vehículo con esa patente" }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al buscar el vehículo. Verifica la configuración de la API.",
    }
  }
}
