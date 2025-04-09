import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash, PlusCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { DialogClose } from "@radix-ui/react-dialog"

const alunosInicial = [
  { id: 1, matricula: "0001", name: "João Silva", email: "joao@email.com" },
]

interface Aluno {
  id: number;
  matricula: string,
  name: string;
  email: string

}


const Alunos = () => {

  //Estado para armazenar os usuários
  const [alunos, setAlunos] = useState(alunosInicial)
  // Estado para armazenar os dados do novo aluno
  const [novoAluno, setNovoAluno] = useState({ name: "", email: "", matricula: "" })
  const [error, setError] = useState(""); // Para armazenar mensagens de erro
  const [isOpen, setIsOpen] = useState(false); // Controla o estado do modal
  const [alunoParaExcluir, setAlunoParaExcluir] = useState<number | null>(null)
  const [alunoParaEditar, setAlunoParaEditar] = useState<Aluno | null>(null)



  // Função para cadastrar um novo usuário
  const handleNovoUsuario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Verificando se os campos estão vazios
    if (!novoAluno.name || !novoAluno.email) {
      setError('Campos em branco')
      return
    }
    if (!novoAluno.email.includes("@")) {
      setError("Digite um e-mail válido.");
      return;
    }

    setError("")

    const newDadosUsuario = {
      id: alunos.length + 1, // Gera o ID automaticamente
      matricula: (alunos.length + 1).toString().padStart(4, '0'), // Gera a matrícula, ex: 0001, 0002, ...
      name: novoAluno.name,
      email: novoAluno.email,
    };
    setAlunos((prevAlunos) => [...prevAlunos, newDadosUsuario]);

    // Limpa os campos do formulário após adicionar
    setNovoAluno({ name: "", email: "", matricula: "" });
    // Fecha o modal após o cadastro
    setIsOpen(false); // Fecha o modal
  }


  //Função para deletar aluno
  const deleteAluno = (id: number) => {
    const novaListaAlunos = alunos.filter(aluno => aluno.id !== id)
    setAlunos(novaListaAlunos)
  }

  const editarAluno = (alunoEditado: Aluno) => {
    if (!alunoEditado) return

    const listaAtualizada = alunos.map(aluno => {
      if (aluno.id === alunoEditado.id) {
        return alunoEditado
      }
      return aluno
    })
    setAlunos(listaAtualizada)
    setAlunoParaEditar(null)
  }


  return (

    <div className="w-full max-w-4xl mx-auto space-y-6 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="font-semibold text-3xl">Alunos cadastrados</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <form className="flex gap-2">
            <Input
              name="matricula"
              placeholder="Buscar matrícula..."
              className="w-[180px] sm:w-auto"
            />
            <Button type="submit" variant="outline" className="gap-2">
              <Search className="w-4 h-4" />
              Filtrar
            </Button>
          </form>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 cursor-pointer">
                <PlusCircle className="w-4 h-4" />
                Novo aluno
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-lg">Novo Aluno</DialogTitle>
                <DialogDescription>
                  Adicione um novo aluno ao sistema preenchendo os campos abaixo.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleNovoUsuario}>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={novoAluno.name}
                    onChange={(e) =>
                      setNovoAluno({ ...novoAluno, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    className="col-span-3"
                    value={novoAluno.email}
                    onChange={(e) => setNovoAluno({ ...novoAluno, email: e.target.value })}
                    placeholder="Digite o e-mail"
                    required
                  />

                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <DialogFooter className="pt-2">
                  <DialogClose>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button type="submit">Cadastrar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border rounded-md p-4 shadow-sm">
        <Table className="">
          <TableHeader>
            <TableRow >
              <TableHead>Matrícula</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alunos.map((aluno) => (
              <TableRow key={aluno.id}>
                <TableCell>{aluno.matricula}</TableCell>
                <TableCell>{aluno.name}</TableCell>
                <TableCell>{aluno.email}</TableCell>
                <TableCell className="text-right">

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="cursor-pointer mr-2"
                        onClick={() => setAlunoParaEditar(aluno)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar aluno</DialogTitle>
                        <DialogDescription>
                          Utilize os campos abaixo para alterar dados do aluno <span className="font-bold">{aluno.name}</span>
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          if (!alunoParaEditar) return
                          editarAluno(alunoParaEditar)
                        }}
                      >
                        <Label htmlFor="aluno">Nome</Label>
                        <Input
                          id="aluno"
                          value={alunoParaEditar?.name || ''}
                          onChange={(e) => {
                            if (!alunoParaEditar) return
                            setAlunoParaEditar({ ...alunoParaEditar, name: e.target.value })
                          }}
                          className="text-zinc-400 mb-6"
                        />

                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          value={alunoParaEditar?.email || ''}
                          onChange={(e) => {
                            if (!alunoParaEditar) return
                            setAlunoParaEditar({ ...alunoParaEditar, email: e.target.value })
                          }}
                          className="text-zinc-400"
                        />

                        <DialogFooter className="mt-6">
                          <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">
                              Cancelar
                            </Button>
                          </DialogClose>

                          <DialogClose asChild>
                            <Button
                              type="submit"
                              variant="destructive"
                              className="cursor-pointer"
                              disabled={
                                !alunoParaEditar?.name.trim() || !alunoParaEditar?.email.trim()
                              }
                            >
                              Confirmar
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => setAlunoParaExcluir(aluno.id)}

                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmar exclusão</DialogTitle>

                        <DialogDescription>
                          Tem certeza que deseja excluir o aluno <span className="font-bold">{aluno.name}</span>?
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            className="cursor-pointer"
                          >
                            Cancelar
                          </Button>
                        </DialogClose>

                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={() => {
                              if (alunoParaExcluir) deleteAluno(alunoParaExcluir)
                            }}
                          >
                            Confirmar
                          </Button>
                        </DialogClose>
                      </DialogFooter>

                    </DialogContent>
                  </Dialog>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div >

    </div >

  )
}


export default Alunos





