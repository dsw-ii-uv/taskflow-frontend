"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Department {
  value: string;
  label: string;
}

export default function LoginPage() {
  const [department, setDepartment] = useState<string>("");

  const departments: Department[] = [
    { value: "HR", label: "Recursos Humanos" },
    { value: "IT", label: "Tecnología" },
    { value: "SALES", label: "Ventas" },
    { value: "MARKETING", label: "Marketing" },
    { value: "FINANCE", label: "Finanzas" },
    { value: "OPERATIONS", label: "Operaciones" },
  ]
  return (
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col md:flex-row shadow-lg">
        
        {/* Columna izquierda - Tabs con Login / Registro */}
        <div className="flex-[2] p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">TaskFlow</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Administra tus tareas de manera eficiente
          </p>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" placeholder="********" />
                </div>
                <Button className="w-full" type="submit">
                  Iniciar Sesión
                </Button>
              </form>
            </TabsContent>

            {/* Registro */}
            <TabsContent value="register">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" type="text" placeholder="Tu nombre" />
                </div>
                <div>
                  <Label htmlFor="reg-email">Correo electrónico</Label>
                  <Input id="reg-email" type="email" placeholder="tu@email.com" />
                </div>
                <div>
                  <Label htmlFor="reg-password">Contraseña</Label>
                  <Input id="reg-password" type="password" placeholder="********" />
                </div>
                <div className="w-full">
                  <Label htmlFor="department">Departamento</Label>
                  <Select
                    value={department}
                    onValueChange={setDepartment}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dep: Department) => (
                        <SelectItem key={dep.value} value={dep.value}>
                          {dep.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="flex w-2/3 mx-auto gap-2 justify-center" type="submit">
                  Registrarse
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Columna derecha - Imagen fija */}
        <div className="flex-[2] hidden md:flex bg-white-100">
          <img
            src="/imagen.png"
            alt="Ilustración de inicio de sesión"
            className="w-full h-full object-cover"
          />
        </div>
      </Card>
  )
}
